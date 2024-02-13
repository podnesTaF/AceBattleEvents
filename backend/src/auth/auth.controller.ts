import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: Partial<User> }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body()
    dto: { newPassword: string; confirmPassword: string; token: string },
  ) {
    return this.authService.setPassword(+id, dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: { email: string }) {
    return this.authService.resetPassword(dto.email);
  }
}
