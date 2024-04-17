import { IsNumber } from 'class-validator';

export class CreateEventRaceTypeDto {
  @IsNumber()
  raceTypeId: number;
}
