import { IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dateOfBirth: string;
}
