import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { AuthenticatedUser, GetUser } from '../decorators/user.decorator';
import { CreateMigration } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/verify')
  verifyMember(@Body() body: { ott: string }): Promise<User> {
    return this.userService.completeVerification(body.ott);
  }

  @Post('/migration')
  migrateUser(@Body() body: CreateMigration) {
    return this.userService.migrateUser(body);
  }

  @Post('/email-confirmation')
  @UseGuards(JwtAuthGuard)
  sendEmailConfirmation(
    @Body() body: { token: string },
    @GetUser() user: AuthenticatedUser,
  ) {
    return this.userService.sendEmailConfirmation(user, body.token);
  }

  @Get('/verify-status')
  @UseGuards(JwtAuthGuard)
  getVerifyStatus(@GetUser() user: AuthenticatedUser) {
    return this.userService.getVerifyStatus(user.id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/exists/:email')
  getUserIfExists(@Param('email') email: string) {
    return this.userService.findByCond({ email });
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

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'avatar', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 2 * 1024 * 1024, // Set to the larger limit (2MB for images)
        },
      },
    ),
  )
  updateProfileData(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; avatar?: Express.Multer.File[] },
    @Request() req,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateProfileData(req.user.id, {
      ...body,
      image: files?.image?.[0],
      avatar: files?.avatar?.[0],
    });
  }

  @Get('count')
  count() {
    return this.userService.count();
  }
}
