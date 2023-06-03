import { IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dataOfBirth: string;

  @IsNumber()
  teamId: number;
}
