import { IsNumber, IsString } from 'class-validator';

export class CreateDistanceDto {
  @IsNumber()
  inCm: number;

  @IsString()
  name: string;
}
