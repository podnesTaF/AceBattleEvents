import { IsNumber, IsOptional } from 'class-validator';

export class CreateStandardDto {
  @IsNumber()
  distanceId: number;

  @IsNumber()
  @IsOptional()
  timeInMs: number;

  @IsNumber()
  genderId: number;

  @IsNumber()
  categoryId: number;
}
