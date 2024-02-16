import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/users/decorators/user.decorator';
import { AddTeamRunnerDto } from '../dto/add-team-runner.dto';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamPlayer } from '../entities/team-player.entity';
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

  @Post('/add-runners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach')
  addRunnerToTeam(
    @GetUser() user: AuthenticatedUser,
    @Body() body: AddTeamRunnerDto,
  ): Promise<TeamPlayer[]> {
    return this.teamService.createTeamPlayersByRunnerIds(
      user.id,
      body.runners,
      body.teamId,
    );
  }

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }
}
