import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { AdminAuthService } from './admin-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles/roles.guard';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @UseGuards(AuthGuard('local-admin'))
  @Post('login')
  async login(@Request() req) {
    return this.adminAuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('register')
  register(@Body() dto: CreateAdminDto) {
    return this.adminAuthService.register(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('change-password')
  changePassword(
    @Request() req,
    @Body() dto: { newPassword: string; repeatPassword: string },
  ) {
    return this.adminAuthService.changePassword(req.user.id, dto);
  }
}