import { IsNumber, IsOptional } from "class-validator";

export class CreatePrizeDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  place: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
