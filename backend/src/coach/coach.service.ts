import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoachDto } from './dto/create-coach-dto';
import { CoachEntity } from './entities/coach.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachEntity)
    private repository: Repository<CoachEntity>,
  ) {}

  create(dto: CreateCoachDto) {
    return this.repository.save(dto);
  }
}
