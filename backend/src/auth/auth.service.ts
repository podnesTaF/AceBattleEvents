import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { createDateFromDDMMYYYY } from 'src/utils/date-formater';
import { generateRandomPassword } from 'src/utils/random-password';
import * as uuid from 'uuid';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

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

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id, roles: ['user'] };
    return this.jwtService.sign(payload);
  }

  async login(user: User, role?: string) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      let randomPassword: string;
      if (!dto.password) {
        randomPassword = generateRandomPassword();
      }
      const hashedPassword = await bcrypt.hash(dto.password || 'podnes', 10);
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      let country: Country | null;
      if (!countryIfExist) {
        country = await this.countryService.create(dto.country);
      } else {
        country = countryIfExist;
      }
      const { password, ...userData } = await this.userService.create({
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
        city: dto.city,
        country,
        password: hashedPassword,
        image: dto.image || null,
        role: dto.role,
        dateOfBirth: createDateFromDDMMYYYY(dto.dateOfBirth),
        worldAthleticsUrl: dto.worldAthleticsUrl || null,
        gender: dto.gender || null,
        club: dto.club || null,
      });
      return {
        ...userData,
        token: this.generateJwtToken(userData),
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
