import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamPlayerService } from '../services/team-player.service';

@ApiTags('teams')
@Controller('team-players')
export class TeamPlayerController {
  constructor(private readonly teamPlayerService: TeamPlayerService) {}

  @Get('runner/:id')
  async getRunnerTeams(@Param('id') id: string) {
    return this.teamPlayerService.getRunnerTeams(+id);
  }
}
