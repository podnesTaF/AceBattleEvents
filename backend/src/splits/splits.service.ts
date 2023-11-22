import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSplitDto } from './dto/create-split.dto';
import { Split } from './entities/splits.entity';

@Injectable()
export class SplitsService {
  constructor(
    @InjectRepository(Split)
    private repository: Repository<Split>,
  ) {}

  create(dto: CreateSplitDto, runnerResultId: number) {
    return this.repository.save({
      ...dto,
      runnerResultId,
      resultInMs: dto.timeInMs,
    });
  }
}