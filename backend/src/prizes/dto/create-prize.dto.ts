import { IsNumber, IsOptional } from 'class-validator';

export class CreatePrizeDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  place: number;

  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  eventId?: number;
}
