import { IsNumber } from 'class-validator';

export class CreateSplitDto {
  @IsNumber()
  distance: number;

  @IsNumber()
  timeInMs: number;
}
