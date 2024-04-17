import { IsOptional, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
