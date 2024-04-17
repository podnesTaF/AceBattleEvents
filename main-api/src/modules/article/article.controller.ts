import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles-auth.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'previewImage', maxCount: 1 }], {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  createArticle(
    @Body() dto: CreateArticleDto,
    @UploadedFiles()
    files: { previewImage?: Express.Multer.File[] },
  ) {
    return this.articleService.createArticle({
      ...dto,
      previewImage: files.previewImage?.[0],
    });
  }

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

  @Get('/:id')
  getArticle(@Param('id') id: number) {
    return this.articleService.getArticle(id);
  }
}
