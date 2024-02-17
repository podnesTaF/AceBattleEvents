import { Controller } from '@nestjs/common';
import { RaceTeamService } from './race-team.service';

@Controller('race-team')
export class RaceTeamController {
  constructor(private readonly raceTeamService: RaceTeamService) {}
}
