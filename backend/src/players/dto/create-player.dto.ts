import { IsArray, IsOptional, IsString } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';
import { CreatePersonalBestDto } from 'src/personal-bests/dto/create-personal-best.dto';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dateOfBirth: string;

  @IsArray()
  personalBests: CreatePersonalBestDto[];

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  worldAthleticsUrl?: string;

  @IsString()
  @IsOptional()
  image?: Media;
}
