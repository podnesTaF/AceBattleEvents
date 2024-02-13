import { IsNumber } from 'class-validator';

export class CreateDistanceDto {
  @IsNumber()
  inCm: number;
}
