import { IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
