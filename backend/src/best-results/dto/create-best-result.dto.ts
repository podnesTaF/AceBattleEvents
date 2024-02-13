import { IsNumber, IsString } from 'class-validator';

export class CreateBestResultDto {
  @IsNumber()
  timeInMs: number;

  @IsNumber()
  distanceId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  userId: number;

  @IsString()
  type: string;
}
