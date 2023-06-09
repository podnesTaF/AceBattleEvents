import { IsArray, IsString } from 'class-validator';
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
}
