import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import { CountryService } from 'src/country/country.service';
import * as uuid from 'uuid';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/services/user.service';

import { ResetUserService } from 'src/reset-user/reset-user.service';
import { changePasswordTemplate } from './utils/getChangePassTemplate';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private countryService: CountryService,
    private resetRepository: ResetUserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
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

  generateJwtToken(data: { id: number; email: string; roles: string[] }) {
    const payload = { email: data.email, sub: data.id, roles: data.roles };
    return this.jwtService.sign(payload);
  }

  async login(user: User, userType: string) {
    const { password, ...userData } = user;
    const roles = [userType];

    return {
      ...userData,
      token: this.generateJwtToken({ ...userData, roles }),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create(dto);
      return {
        ...userData,
      };
    } catch (err) {
      throw new ForbiddenException('Register error');
    }
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
