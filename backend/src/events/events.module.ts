import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/locations/entities/locations.entity';
import { LocationsService } from 'src/locations/locations.service';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { PrizesService } from 'src/prizes/prizes.service';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location, PrizeEntity])],
  controllers: [EventsController],
  providers: [EventsService, LocationsService, PrizesService],
  exports: [EventsService],
})
export class EventsModule {}
