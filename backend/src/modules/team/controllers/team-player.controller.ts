import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamPlayerService } from '../services/team-player.service';

@ApiTags('teams')
@Controller('team-player')
export class TeamPlayerController {
  constructor(private readonly teamPlayerService: TeamPlayerService) {}
}