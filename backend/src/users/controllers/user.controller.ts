import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CompleteVerificationDto } from '../dtos/complete-verification.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
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
    dto: CompleteVerificationDto,
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
    return this.userService.findByCond({ id: +req.user.id });
  }

  @Get('/followers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('runner')
  getFollowers(@Request() req: any) {
    return this.userService.getRunnerFollowers(+req.user.id);
  }

  @Get('/following-teams')
  @UseGuards(JwtAuthGuard)
  geFollowingTeams(@Request() req: any) {
    return this.userService.getFollowingTeams(req.user.id);
  }

  @Get(':id')
  getUserProfile(@Param('id') id: number, @Query() query: { authId: string }) {
    return this.userService.findById(+id, query.authId);
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
