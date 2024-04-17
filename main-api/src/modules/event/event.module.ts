import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { Gender } from '../gender/entities/gender.entity';
import { EventController } from './controllers/event.controller';
import { EventType } from './entities/event-type.entity';
import { Event } from './entities/event.entity';
import { EventService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType, Gender])],
  controllers: [EventController],
  providers: [EventService, FileService],
})
export class EventModule {}
