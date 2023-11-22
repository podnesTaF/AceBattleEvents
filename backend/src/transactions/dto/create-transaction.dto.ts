import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  type: string;

  @IsString()
  txHash: string;

  @IsString()
  wallet: string;
}