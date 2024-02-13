import { IsNumber } from 'class-validator';

export class CreateStandardDto {
  @IsNumber()
  distanceId: number;

  @IsNumber()
  timeInMs: number;

  @IsNumber()
  genderId: number;

  @IsNumber()
  categoryId: number;
}
