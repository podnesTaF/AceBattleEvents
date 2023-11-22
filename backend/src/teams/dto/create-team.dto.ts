import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCoachDto } from 'src/coach/dto/create-coach-dto';
import { Media } from 'src/media/entities/media.entity';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  clubId: number;

  @IsString()
  gender: string;

  @IsString()
  city: string;

  @IsNumber()
  countryId: number;

  @IsObject()
  @IsOptional()
  logo?: Media;

  @IsObject()
  @IsOptional()
  teamImage?: Media;

  @IsObject()
  coach: CreateCoachDto;

  @IsArray()
  players: number[];
}