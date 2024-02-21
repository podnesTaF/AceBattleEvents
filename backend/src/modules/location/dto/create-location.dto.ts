import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  zipCode: string;

  @IsNumber()
  countryId: number;

  @IsString()
  @IsOptional()
  placeImageUrl: string;

  @IsString()
  @IsOptional()
  stadiumName?: string;
}
