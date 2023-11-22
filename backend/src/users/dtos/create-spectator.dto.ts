import { IsString } from 'class-validator';

export class CreateSpectatorDto {
  @IsString()
  ageRange: string;
}