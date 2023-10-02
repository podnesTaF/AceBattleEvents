import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ResetUserService } from './reset-user.service';

@Controller('reset-user')
export class ResetUserController {
  constructor(private readonly resetUserService: ResetUserService) {}

  @Post()
  resetUser(@Body() dto: { user: User; token: string }) {
    return this.resetUserService.create({ ...dto });
  }

  @Get('/check/:token')
  checkToken(@Param('token') token: string) {
    return this.resetUserService.checkToken(token);
  }

  @Get('/user/:token')
  getResetUser(@Param('token') token: string) {
    return this.resetUserService.getResetUser(token);
  }
}
