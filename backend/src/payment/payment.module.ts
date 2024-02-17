import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPurpose } from './entities/payment-purpose.entity';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPurpose, Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
