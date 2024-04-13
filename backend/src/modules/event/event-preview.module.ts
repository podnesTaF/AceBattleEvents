import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../content/entities/content.entity';
import { FileService } from '../file/file.service';
import { EventPreviewController } from './controllers/event-preview.controller';
import { EventPreview } from './entities/event-preview.entity';
import { Event } from './entities/event.entity';
import { EventPreviewService } from './services/event-preview.service';

@Module({
  controllers: [EventPreviewController],
  providers: [EventPreviewService, FileService],
  imports: [TypeOrmModule.forFeature([EventPreview, Event, Content])],
})
export class EventPreviewModule {}
