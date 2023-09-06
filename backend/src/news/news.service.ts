import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { CreateHashtagDto } from 'src/hashtag/dto/create-hashtag.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Repository } from 'typeorm';
import { CreateNewsDto, updateNewsDto } from './dto/create.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private repository: Repository<News>,
    private contentService: ContentService,
    private hashtagService: HashtagService,
  ) {}

  getNews() {
    return this.repository.find({
      relations: ['contents', 'hashtags', 'contents.media'],
    });
  }

  async getNewsPreviews({
    relatedNews,
    itemsAmount,
  }: {
    relatedNews?: News[];
    itemsAmount?: number;
  }) {
    const newsList = relatedNews ? relatedNews : await this.getNews();

    const newsPreviews = newsList.map((news) => {
      const content = news.contents.find((item) => item.type === 'text');
      const media = news.contents.find((item) => item.type === 'image')?.media;

      let previewText = '';
      if (content) {
        previewText =
          content.text.length > 80
            ? content.text.substring(0, 80) + '...'
            : content.text;
      }

      return {
        id: news.id,
        title: news.title,
        previewText: previewText,
        smallImageUrl: media ? media.smallUrl : '',
        createdAt: news.createdAt,
      };
    });

    return !isNaN(+itemsAmount)
      ? newsPreviews.slice(0, +itemsAmount)
      : newsPreviews;
  }

  async getNewsById(id: number) {
    const news = await this.repository.findOne({
      where: { id },
      relations: [
        'contents',
        'hashtags',
        'contents.media',
        'mainImage',
        'hashtags.news',
        'hashtags.news.contents',
        'hashtags.news.contents.media',
        // 'hashtags.events',
      ],
    });

    const relatedFullNews: {
      [key: number]: News;
    } = news.hashtags.reduce((acc, hashtag) => {
      return {
        ...acc,
        ...hashtag.news.reduce(
          (acc, news) => ({ ...acc, [news.id]: news }),
          {},
        ),
      };
    }, {});

    const relatedNews = await this.getNewsPreviews({
      relatedNews: Object.values(relatedFullNews).filter(
        (item) => item.id !== news.id,
      ),
    });

    // const relatedEvents: Event[] = news.hashtags.reduce((acc, hashtag) => {
    //   return [...acc, ...hashtag.events];
    // }, []);

    delete news.hashtags;

    return {
      ...news,
      relatedNews,
      // relatedEvents,
    };
  }

  async createNews(dto: CreateNewsDto) {
    const contents = [];
    const hashtags = [];

    const news = await this.repository.save({
      title: dto.title,
    });

    for (const content of dto.contents) {
      const newContent = await this.contentService.create(
        { ...content },
        news.id,
      );
      contents.push(newContent);
    }

    for (const hashtag of dto.hashtags) {
      const hashtagClass = new CreateHashtagDto();
      hashtagClass.name = hashtag;
      const newHashtag = await this.hashtagService.create(hashtagClass);
      hashtags.push(newHashtag);
    }

    return this.repository.save({
      ...news,
      contents,
      hashtags,
    });
  }

  async updateNews(id: number, body: updateNewsDto) {
    const news = await this.repository.findOne({
      where: { id },
      relations: ['hashtags', 'contents'],
    });

    news.contents = body.contents || news.contents;
    news.hashtags = body.hashtags || news.hashtags;
    news.title = body.title || news.title;

    return this.repository.save(news);
  }

  deleteNews(id: number) {
    return this.repository.delete(id);
  }
}
