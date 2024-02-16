import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { Event } from 'src/event/entities/event.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private repository: Repository<Content>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async createContent(dto: CreateContentDto): Promise<Content> {
    const content = this.repository.create({
      ...dto,
      articleId: null,
      eventId: null,
    });

    // check if event or article exists

    // event
    if (dto.eventId) {
      const event = await this.eventRepository.findOne({
        where: { id: dto.eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      content.eventId = dto.eventId;
    }

    // article
    if (dto.articleId) {
      const article = await this.articleRepository.findOne({
        where: { id: dto.articleId },
      });

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      content.articleId = dto.articleId;
    }

    return this.repository.save(content);
  }

  // edit content
  async updateContent(
    id: number,
    dto: UpdateContentDto,
  ): Promise<UpdateResult> {
    const content = await this.repository.findOne({ where: { id } });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    if (content.type === 'text' && dto.text) {
      return this.repository.update(id, { text: dto.text });
    }

    if (content.type === 'media' && dto.mediaUrl) {
      return this.repository.update(id, { mediaUrl: dto.mediaUrl });
    }
  }
}
