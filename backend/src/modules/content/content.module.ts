import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Event, Article])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
