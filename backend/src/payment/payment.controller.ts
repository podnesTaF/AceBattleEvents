import { Controller } from '@nestjs/common';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // create payments for something

  // create payment purpose (admin)
}
