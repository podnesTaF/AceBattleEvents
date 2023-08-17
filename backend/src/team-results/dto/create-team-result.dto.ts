import { IsNumber } from 'class-validator';

export class CreateTeamResultDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  resultInMs: number;

  @IsNumber()
  raceId: number;
}
