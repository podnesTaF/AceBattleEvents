import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTeamResultDto } from './dto/create-team-result.dto';
import { TeamResultsService } from './team-results.service';

@Controller('team-results')
export class TeamResultsController {
  constructor(private readonly teamResultsService: TeamResultsService) {}

  @Post()
  createTeamResults(@Body() dto: CreateTeamResultDto) {
    return this.teamResultsService.create(dto);
  }

  @Get('/club/:clubId')
  getClubResults(@Param('clubId') clubId: string) {
    return this.teamResultsService.getClubResults(+clubId);
  }

  @Get('/team/:teamId')
  getTeamResults(@Param('teamId') teamId: string) {
    return this.teamResultsService.getTeamResults(+teamId);
  }
}
