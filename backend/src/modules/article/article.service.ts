import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly fileService: FileService,
  ) {}

  async createArticle(
    dto: CreateArticleDto & { previewImage: Express.Multer.File },
  ) {
    const { previewImage, ...rest } = dto;
    const article = await this.articleRepository.save(rest);

    if (previewImage) {
      const url = await this.fileService.uploadFileToStorage(
        previewImage.originalname,
        'articles',
        previewImage.mimetype,
        previewImage.buffer,
        {
          mediaName: previewImage.originalname,
          contentType: previewImage.mimetype,
        },
      );

      article.previewImageUrl = url;
      return await this.articleRepository.save(article);
    }

    return article;
  }

  async getNewsPreviews({
    relatedNews,
    page,
    limit,
    textLength,
    tags,
  }: {
    page?: number;
    relatedNews?: Article[];
    limit?: number;
    textLength?: number;
    tags?: string;
  }) {
    const hashtags: string[] | null =
      (tags?.split(',')[0] !== '' && tags?.split(',')) || null;

    const newsCount = await this.articleRepository.count();
    const newsList = relatedNews
      ? relatedNews
      : await this.getNews(limit, page, hashtags);

    const totalPages = Math.ceil(newsCount / (limit || newsCount));

    const newsPreviews = newsList.map((news) => {
      const content = news.contents.find((item) => item.type === 'text');

      let previewText = '';
      if (content) {
        previewText =
          content.text.length > (textLength || 90)
            ? content.text.substring(0, textLength || 90) + '...'
            : content.text;
      }

      return {
        id: news.id,
        title: news.title,
        previewText: previewText,
        previewImageUrl: news.previewImageUrl,
        createdAt: news.createdAt,
      };
    });

    return { newsPreviews, totalPages };
  }

  // Get all news
  getNews(limit?: number, page?: number, hashtags?: string[]) {
    return this.articleRepository.find({
      relations: ['contents'],
      take: limit,
      where: hashtags
        ? {
            hashtags: hashtags.map((hashtag) => ({ name: hashtag })),
          }
        : {},
      skip: page ? (page - 1) * limit : 0,
      order: { createdAt: 'DESC' },
    });
  }

  async getArticle(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id: +id },
      relations: ['contents', 'hashtags', 'hashtags.articles'],
    });

    const relatedFullNews: {
      [key: number]: Article;
    } = article.hashtags.reduce((acc, hashtag) => {
      return {
        ...acc,
        ...hashtag.articles.reduce(
          (acc, article) => ({ ...acc, [article.id]: article }),
          {},
        ),
      };
    }, {});

    console.log(relatedFullNews);

    const relatedArticles = await this.getNewsPreviews({
      relatedNews: Object.values(relatedFullNews).filter(
        (item) => item.id !== article.id,
      ),
    });

    article.hashtags = article.hashtags.map((hashtag) => ({
      id: hashtag.id,
      name: hashtag.name,
      articles: null,
      events: null,
    }));

    return {
      ...article,
      relatedArticles,
      // relatedEvents,
    };
  }
}
