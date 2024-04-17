import { IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  ticketId: number;
}
