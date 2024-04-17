import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceTeam } from 'src/modules/race-team/entities/race-team.entity';
import { Penalty } from './entities/penalty.entity';
import { PenaltyController } from './penalty.controller';
import { PenaltyService } from './penalty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Penalty, RaceTeam])],
  controllers: [PenaltyController],
  providers: [PenaltyService],
})
export class PenaltyModule {}
