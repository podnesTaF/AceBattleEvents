import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from 'src/locations/entities/locations.entity';
import { LocationsService } from 'src/locations/locations.service';
import { EventEntity } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, LocationEntity])],
  controllers: [EventsController],
  providers: [EventsService, LocationsService],
  exports: [EventsService],
})
export class EventsModule {}
