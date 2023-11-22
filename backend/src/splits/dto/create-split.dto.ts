import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSplitDto {
  @IsNumber()
  distance: number;

  @IsString()
  @IsOptional()
  splitType: string;

  @IsNumber()
  timeInMs: number;
}