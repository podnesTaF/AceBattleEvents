import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Split } from './entities/splits.entity';
import { SplitsController } from './splits.controller';
import { SplitsService } from './splits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Split])],
  controllers: [SplitsController],
  providers: [SplitsService],
  exports: [SplitsService],
})
export class SplitsModule {}
