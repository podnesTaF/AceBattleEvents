import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamRaceRunnerDto } from './create-team-race-runner.dto';

export class UpdateTeamRaceRunnerDto extends PartialType(CreateTeamRaceRunnerDto) {}