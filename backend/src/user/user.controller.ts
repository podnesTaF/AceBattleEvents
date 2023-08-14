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

  @Patch('/image')
  @UseGuards(JwtAuthGuard)
  updateImage(@Request() req, @Body() body: { imageId: number }) {
    return this.userService.updateImage(req.user.id, body.imageId);
  }

  @Get('count')
  count() {
    return this.userService.count();
  }
}
