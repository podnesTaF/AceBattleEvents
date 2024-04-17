import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import {
  AuthenticatedUser,
  GetUser,
} from 'src/modules/users/decorators/user.decorator';
import { ConfirmRaceTeamDto } from './dto/confirm-race-team.dto';
import { CreateRaceTeamDto } from './dto/create-race-team.dto';
import { RaceTeamService } from './race-team.service';

@Controller('race-teams')
export class RaceTeamController {
  constructor(private readonly raceTeamService: RaceTeamService) {}

  // add teams to a race
  @Post('/many')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createTeamForRace(@Body() dto: CreateRaceTeamDto) {
    return this.raceTeamService.createTeamForRace(dto);
  }

  @Post('/:raceTeamId/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coach', 'admin')
  confirmRaceTeamParticipation(
    @Param('raceTeamId') raceTeamId: number,
    @Body() dto: ConfirmRaceTeamDto,
    @GetUser() user: AuthenticatedUser,
  ) {
    return this.raceTeamService.confirmRaceTeamParticipation({
      raceTeamId,
      dto,
      user: user,
    });
  }

  @Get('/team/:teamId')
  getTeamResultsDetails(@Param('teamId') teamId: number) {
    return this.raceTeamService.getTeamDetails(teamId);
  }
}
