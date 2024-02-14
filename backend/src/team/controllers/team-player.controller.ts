import { Controller } from '@nestjs/common';
import { TeamPlayerService } from '../services/team-player.service';

@Controller('team-player')
export class TeamPlayerController {
  constructor(private readonly teamPlayerService: TeamPlayerService) {}
}
