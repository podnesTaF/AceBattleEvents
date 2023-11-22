import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  city: string;

  @IsString()
  zipCode: string;

  @IsString()
  address: string;
}