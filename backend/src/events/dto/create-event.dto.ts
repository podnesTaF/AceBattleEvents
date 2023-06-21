import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreatePrizeDto } from 'src/prizes/dto/create-prize.dto';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  introImageUrl: string;

  @IsString()
  @IsOptional()
  minorImageUrl: string;

  @IsString()
  date: string;

  @IsObject()
  location: CreateLocationDto;

  @IsArray()
  prizes: CreatePrizeDto[];
}
