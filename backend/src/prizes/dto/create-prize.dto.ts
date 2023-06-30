import { IsNumber, IsOptional } from 'class-validator';

export class CreatePrizeDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  place: number;

  @IsNumber()
  @IsOptional()
  eventId?: number;
}
