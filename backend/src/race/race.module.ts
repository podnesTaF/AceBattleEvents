import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRaceType } from 'src/event-race-type/entities/event-race-type.entity';
import { Race } from './entities/race.entity';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Race, EventRaceType])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
