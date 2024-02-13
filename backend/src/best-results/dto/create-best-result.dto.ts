import { IsNumber, IsString } from 'class-validator';

export class CreateBestResultDto {
  @IsNumber()
  timeInMs: number;

  @IsNumber()
  distanceId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  runnerId: number;

  @IsString()
  type: string;
}
