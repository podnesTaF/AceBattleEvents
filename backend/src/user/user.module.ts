import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TransactionEntity])],
  controllers: [UserController],
  providers: [UserService, TransactionsService],
  exports: [UserService],
})
export class UserModule {}
