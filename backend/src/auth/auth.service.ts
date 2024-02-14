import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/services/user.service';

import { ResetUserService } from 'src/reset-user/reset-user.service';
import { RequestRole } from 'src/users/decorators/user.decorator';
import { changePasswordTemplate } from './utils/getChangePassTemplate';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private resetRepository: ResetUserService,
  ) {
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async login(user: Partial<User>) {
    const roles = user.roles.map((userRole) => ({
      id: userRole.role.id,
      name: userRole.role.name,
      active: userRole.active,
    }));
    return {
      token: this.generateJwtToken({
        id: user.id,
        email: user.email,
        roles,
      }),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const encryptedPassword = await bcrypt.hash(dto.password, 12);
      const userData = await this.userService.create({
        ...dto,
        password: encryptedPassword,
      });
      return {
        ...userData,
      };
    } catch (err) {
      throw new BadRequestException('Register error');
    }
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Partial<User>> {
    const user = await this.userService.findByCond({
      email,
    });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string; roles: RequestRole[] }) {
    const payload = { email: data.email, id: data.id, roles: data.roles };
    return this.jwtService.sign(payload);
  }

  async setPassword(
    id: number,
    dto: { newPassword: string; confirmPassword: string; token: string },
  ) {
    try {
      if (dto.newPassword !== dto.confirmPassword) {
        throw new ForbiddenException('Passwords do not match');
      }
      const resetUser = await this.resetRepository.findByCond({
        token: dto.token,
      });

      if (!resetUser) {
        throw new ForbiddenException('Reset user not found');
      }

      await this.resetRepository.remove(resetUser.id);

      const hashedPassword = await bcrypt.hash(dto.newPassword, 12);
      await this.userService.updatePassword(id, hashedPassword);
      return { message: 'Password changed' };
    } catch (err) {
      throw new ForbiddenException('Set password error');
    }
  }

  async resetPassword(email: string) {
    try {
      const user = await this.userService.findByCond({ email });
      if (!user) {
        throw new ForbiddenException('User with this email does not exist');
      }

      const randomToken = uuid.v4().toString();

      const resetUser = await this.resetRepository.create({
        token: randomToken,
        user,
      });

      if (!resetUser) {
        throw new ForbiddenException('Error creating reset user');
      }

      const msg = {
        to: email,
        from: 'it.podnes@gmail.com',
        subject: 'Reset password | Ace Battle Mile',
        html: changePasswordTemplate({
          token: randomToken,
          type: 'user',
        }),
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.log('error sending email', error.message);
      }

      return { message: 'Email sent' };
    } catch (error) {
      throw new ForbiddenException('Reset password error');
    }
  }
}
