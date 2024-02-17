import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
