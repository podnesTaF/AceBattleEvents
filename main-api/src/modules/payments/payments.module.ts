import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { Role } from '../role/entities/role.entity';
import { UserRole } from '../user-role/entities/user-role.entity';
import { User } from '../users/entities/user.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLIC_KEY: Joi.string().required(),
        STRIPE_WEBHOOK_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
