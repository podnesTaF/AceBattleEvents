import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('/verify')
  verifyMember(
    @Body()
    dto: {
      user: User;
      token: string;
      ticket: boolean;
      password: string;
    },
  ) {
    return this.userService.completeVerification(dto);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get(':id')
  getUserProfile(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch('/image')
  @UseGuards(JwtAuthGuard)
  updateImage(@Request() req, @Body() body: { imageId: number }) {
    return this.userService.updateImage(req.user.id, body.imageId);
  }

  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Request() req,
    @Body()
    body: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    return this.userService.changePassword(req.user.id, body);
  }

  @Patch('/profile-data')
  @UseGuards(JwtAuthGuard)
  updateProfileData(@Request() req, @Body() body: UpdateUserDto) {
    return this.userService.updateProfileData(req.user.id, body);
  }

  @Get('count')
  count() {
    return this.userService.count();
  }
}
