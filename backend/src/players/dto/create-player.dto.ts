import { IsOptional, IsString } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  worldAthleticsUrl?: string;

  @IsString()
  @IsOptional()
  image?: Media;
}
