import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetUser } from './entities/reset-user.entity';
import { ResetUserController } from './reset-user.controller';
import { ResetUserService } from './reset-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResetUser])],
  controllers: [ResetUserController],
  providers: [ResetUserService],
  exports: [ResetUserService],
})
export class ResetUserModule {}