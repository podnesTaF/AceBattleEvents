import { Module } from '@nestjs/common';
import { VisitorTicketService } from './visitor-ticket.service';
import { VisitorTicketController } from './visitor-ticket.controller';

@Module({
  controllers: [VisitorTicketController],
  providers: [VisitorTicketService]
})
export class VisitorTicketModule {}
