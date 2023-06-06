import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    console.log(req.user);
    return this.userService.findById(req.user.id);
  }
}
