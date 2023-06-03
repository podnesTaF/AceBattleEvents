import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  prize: number;

  @IsString()
  date: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
