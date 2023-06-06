import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
  @IsString()
  city: string;

  @IsString()
  country: string;
}
