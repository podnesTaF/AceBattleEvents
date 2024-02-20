import { IsOptional, IsString } from 'class-validator';

export class CreateRaceTypeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
