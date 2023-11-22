import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { changePasswordTemplate } from './utils/getChangePassTemplate';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isEqual = await bcrypt.compare(password, admin.password);
      if (isEqual) {
        const { password, ...result } = admin;
        return result;
      }
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id, roles: ['admin'] };
    return this.jwtService.sign(payload);
  }

  async login(admin: Admin) {
    const { password, ...adminData } = admin;
    return {
      ...adminData,
      token: this.generateJwtToken(adminData),
    };
  }

  async register(dto: CreateAdminDto) {
    try {
      const admin = await this.adminService.create({
        email: dto.email,
        name: dto.name,
        surname: dto.surname,
      });

      const adminWithToken = {
        ...admin,
        token: this.generateJwtToken(admin),
      };

      const msg = {
        to: admin.email,
        from: 'it.podnes@gmail.com', // Set your sender email
        subject: 'Registration as admin on Ace Battle Mile',
        html: changePasswordTemplate({
          token: adminWithToken.token,
          type: 'admin',
        }),
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.log('error sending email', error.message);
      }

      return adminWithToken;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Registering admin error');
    }
  }

  async changePassword(
    id: number,
    dto: { newPassword: string; repeatPassword: string },
  ) {
    try {
      if (dto.newPassword !== dto.repeatPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      const hashedPassword = await bcrypt.hash(dto.newPassword, 12);
      await this.adminService.update(id, { password: hashedPassword });
      return { message: 'Password changed' };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Changing password error');
    }
  }
}