import { IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  name: string;

  @IsNumber()
  volume: number;

  @IsNumber()
  eventId: number;
}
