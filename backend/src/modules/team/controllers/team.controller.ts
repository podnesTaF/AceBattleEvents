import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/modules/users/decorators/user.decorator';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamService } from '../services/team.service';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 4 * 1024 * 1024,
        },
      },
    ),
  )
  createTeam(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
    @GetUser() user: AuthenticatedUser,
    @Body() body: CreateTeamDto,
  ) {
    return this.teamService.createTeam({
      user,
      dto: body,
      image: files?.image?.[0],
      logo: files?.logo?.[0],
    });
  }

  @Get('/previews')
  findAllPreviews() {
    return this.teamService.findAllPreviews();
  }

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }
}
