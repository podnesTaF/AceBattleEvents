import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { EventType } from './entities/event-type.entity';
import { Event } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType])],
  controllers: [EventController],
  providers: [EventService, FileService],
})
export class EventModule {}
