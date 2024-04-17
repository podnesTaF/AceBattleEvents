import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Split } from './entities/split.entity';
import { SplitController } from './split.controller';
import { SplitService } from './split.service';

@Module({
  imports: [TypeOrmModule.forFeature([Split])],
  controllers: [SplitController],
  providers: [SplitService],
  exports: [SplitService],
})
export class SplitModule {}
