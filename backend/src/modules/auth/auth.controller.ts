import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/modules/users/dtos/login-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Request() req: { user: Partial<User> }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
