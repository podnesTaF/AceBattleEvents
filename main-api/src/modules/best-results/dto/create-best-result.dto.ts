import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBestResultDto {
  @IsNumber()
  timeInMs: number;

  @IsNumber()
  distanceId: number;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsNumber()
  runnerId: number;

  @IsString()
  type: string;
}
