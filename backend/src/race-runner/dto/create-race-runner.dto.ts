import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRaceParticipantDto {
  @IsNumber()
  readonly runnerId: number;

  @IsNumber()
  readonly runnerRoleId: number;

  @IsString()
  @IsOptional()
  readonly startNumber: string;
}

export class CreateTeamRaceRunnerDto extends CreateRaceParticipantDto {
  @IsNumber()
  readonly raceTeamId: number;
}

export class CreateRaceRunnerDto extends CreateRaceParticipantDto {
  @IsNumber()
  readonly raceId: number;
}
