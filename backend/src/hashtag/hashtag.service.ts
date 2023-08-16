import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private repository: Repository<Hashtag>,
  ) {}

  async create(createHashtagDto: CreateHashtagDto) {
    const hashagIfExist = await this.returnIfExist({
      name: createHashtagDto.name,
    });

    if (!hashagIfExist) {
      const hashtag = await this.repository.save({
        name: createHashtagDto.name,
      });
      return hashtag;
    } else {
      return hashagIfExist;
    }
  }

  async returnIfExist(query: any) {
    const hashtag = await this.repository.findOne({ where: { ...query } });

    return hashtag || null;
  }

  findAll() {
    return `This action returns all hashtag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hashtag`;
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} hashtag`;
  }
}
