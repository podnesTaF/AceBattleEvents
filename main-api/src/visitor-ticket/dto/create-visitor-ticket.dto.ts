import { IsNumber, IsOptional } from 'class-validator';

export class CreateVisitorTicketDto {
  @IsNumber()
  ticketId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  couponId: number;
}
