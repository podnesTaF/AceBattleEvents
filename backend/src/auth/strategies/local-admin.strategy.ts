import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private readonly adminService: AdminService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isEqual = await bcrypt.compare(password, admin.password);
      if (isEqual) {
        const { password, ...result } = admin;
        return { userType: 'admin', ...result };
      }
    }
    return null;
  }
}