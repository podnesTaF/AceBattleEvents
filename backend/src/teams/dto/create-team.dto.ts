import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCoachDto } from 'src/coach/dto/create-coach-dto';
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
  coach: CreateCoachDto;

  @IsArray()
  players: CreatePlayerDto[];
}
