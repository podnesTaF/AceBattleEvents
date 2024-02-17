import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penalty } from './entities/penalty.entity';
import { PenaltyController } from './penalty.controller';
import { PenaltyService } from './penalty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Penalty])],
  controllers: [PenaltyController],
  providers: [PenaltyService],
})
export class PenaltyModule {}
