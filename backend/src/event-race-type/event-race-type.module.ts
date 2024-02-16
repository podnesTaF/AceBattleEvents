import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';
import { EventRaceType } from './entities/event-race-type.entity';
import { RaceType } from './entities/race-type.entity';
import { EventRaceTypeController } from './event-race-type.controller';
import { EventRaceTypeService } from './event-race-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRaceType, RaceType, Event])],
  controllers: [EventRaceTypeController],
  providers: [EventRaceTypeService],
})
export class EventRaceTypeModule {}
