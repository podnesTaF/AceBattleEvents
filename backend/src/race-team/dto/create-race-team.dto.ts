import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRaceTeamDto {
  @IsArray()
  @IsNotEmpty()
  readonly teamIds: number[];

  @IsNumber()
  readonly raceId: number;
}
