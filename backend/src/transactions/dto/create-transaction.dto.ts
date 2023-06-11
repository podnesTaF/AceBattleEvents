import { IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;
}
