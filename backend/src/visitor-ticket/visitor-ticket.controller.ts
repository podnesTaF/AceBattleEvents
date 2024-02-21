import { Controller } from '@nestjs/common';
import { VisitorTicketService } from './visitor-ticket.service';

@Controller('visitor-ticket')
export class VisitorTicketController {
  constructor(private readonly visitorTicketService: VisitorTicketService) {}
}
