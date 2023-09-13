import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNewsDto, updateNewsDto } from './dto/create.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getNews();
  }

  @Get('previews')
  getNewsPreviews(
    @Query() query: { limit?: string; textLength?: string; page?: string },
  ) {
    return this.newsService.getNewsPreviews({
      limit: +query.limit || 5,
      textLength: +query.textLength,
      page: +query.page || 1,
    });
  }

  @Get(':id')
  getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(+id);
  }

  @Post()
  createNews(@Body() body: CreateNewsDto) {
    return this.newsService.createNews(body);
  }

  @Patch(':id')
  updateNews(@Param('id') id: string, @Body() body: updateNewsDto) {
    return this.newsService.updateNews(+id, body);
  }

  @Delete(':id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(+id);
  }
}
