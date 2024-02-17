import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly paymentType: number;
}
