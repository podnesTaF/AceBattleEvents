import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "./entities/content.entity";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private repository: Repository<Content>,
  ) {}

  create(
    createContentDto: CreateContentDto,
    {
      newsId,
      notificationId,
      eventId,
    }: { newsId?: number; notificationId?: number; eventId?: number },
  ) {
    return this.repository.save({
      ...createContentDto,
      notificationId: notificationId,
      newsId,
      eventId,
    });
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
