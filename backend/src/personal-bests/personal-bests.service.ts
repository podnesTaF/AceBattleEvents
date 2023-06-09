import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonalBestDto } from './dto/create-personal-best.dto';
import { UpdatePersonalBestDto } from './dto/update-personal-best.dto';
import { PersonalBestEntity } from './entities/personal-best.entity';

@Injectable()
export class PersonalBestsService {
  constructor(
    @InjectRepository(PersonalBestEntity)
    private repository: Repository<PersonalBestEntity>,
  ) {}
  create(createPersonalBestDto: CreatePersonalBestDto) {
    return this.repository.save(createPersonalBestDto);
  }

  findAll() {
    return `This action returns all personalBests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalBest`;
  }

  update(id: number, updatePersonalBestDto: UpdatePersonalBestDto) {
    return `This action updates a #${id} personalBest`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalBest`;
  }
}
