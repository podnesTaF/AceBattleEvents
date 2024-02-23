import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  createTeam(@GetUser() user: AuthenticatedUser, @Body() body: CreateTeamDto) {
    return this.teamService.createTeam({ user, dto: body });
  }

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }
}