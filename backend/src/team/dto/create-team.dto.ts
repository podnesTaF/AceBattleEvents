import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsNumber()
  countryId: number;

  @IsString()
  city: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  genderId: number;

  @IsString()
  @IsOptional()
  logoUrl: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  teamBio: string;

  @IsArray()
  runners: number[];
}
