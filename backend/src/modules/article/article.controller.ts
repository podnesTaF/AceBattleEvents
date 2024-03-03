import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('previews')
  getArticlesPreviews(
    @Query()
    query: {
      limit?: string;
      textLength?: string;
      page?: string;
      tags: string;
    },
  ) {
    return this.articleService.getNewsPreviews({
      limit: +query.limit || 5,
      textLength: +query.textLength,
      page: +query.page || 1,
      tags: query.tags,
    });
  }
}
