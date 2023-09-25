import { IsNumber } from 'class-validator';

export class CreatePersonalBestDto {
  @IsNumber()
  distanceInCm: number;

  @IsNumber()
  timeInMs: number;
}
