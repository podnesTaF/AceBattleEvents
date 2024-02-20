import { IsArray, IsNumber } from 'class-validator';

export class ConfirmRaceTeamDto {
  @IsArray()
  @IsNumber({}, { each: true })
  readonly raceRunnerIds: number[];
}
