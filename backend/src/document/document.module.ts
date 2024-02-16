import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Event])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
