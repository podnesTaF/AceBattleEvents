import { IsString } from 'class-validator';

export class CreateCoachDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;
}