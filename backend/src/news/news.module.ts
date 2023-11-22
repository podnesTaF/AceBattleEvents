import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { Content } from 'src/content/entities/content.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { News } from './entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News, Hashtag, Content])],
  controllers: [NewsController],
  providers: [NewsService, ContentService, HashtagService],
})
export class NewsModule {}