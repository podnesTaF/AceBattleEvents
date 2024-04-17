import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleHashtag } from './entities/article-hashtag.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleHashtag])],
  controllers: [ArticleController],
  providers: [ArticleService, FileService],
})
export class ArticleModule {}
