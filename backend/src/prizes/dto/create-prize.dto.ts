import { IsNumber, IsOptional } from 'class-validator';

export class CreatePrizeDto {
  @IsNumber()
  sum: number;

  @IsNumber()
  place: number;

  @IsNumber()
  @IsOptional()
  eventId?: number;
}
