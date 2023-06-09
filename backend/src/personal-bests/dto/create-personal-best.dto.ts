import { IsNumber } from 'class-validator';

export class CreatePersonalBestDto {
  @IsNumber()
  distance: number;

  @IsNumber()
  time: number;
}
