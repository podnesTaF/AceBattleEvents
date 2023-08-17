import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamResultDto } from './dto/create-team-result.dto';
import { TeamResultsService } from './team-results.service';

@Controller('team-results')
export class TeamResultsController {
  constructor(private readonly teamResultsService: TeamResultsService) {}

  @Post()
  createTeamResults(@Body() dto: CreateTeamResultDto) {
    return this.teamResultsService.create(dto);
  }
}
