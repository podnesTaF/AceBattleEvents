import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCoachDto } from 'src/coach/dto/create-coach-dto';
import { Media } from 'src/media/entities/media.entity';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  club?: string;

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
  players: CreatePlayerDto[];
}
