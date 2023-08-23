import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/athletes')
  getAllRunners(@Query() queries: any) {
    return this.userService.findAllRunners(queries);
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

  @Get(':id/favorite-clubs')
  getFavoriteClubs(@Param('id') id: number) {
    return this.userService.findFavoriteClubs(id);
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
    body: { oldPassword: string; newPassword: string; repeatPassword: string },
  ) {
    return this.userService.changePassword(req.user.id, body);
  }

  @Get('count')
  count() {
    return this.userService.count();
  }
}
