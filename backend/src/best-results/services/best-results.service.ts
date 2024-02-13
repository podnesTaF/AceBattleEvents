import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBestResultDto } from '../dto/create-best-result.dto';
import { BestResult } from '../entities/best-result.entity';

@Injectable()
export class BestResultsService {
  constructor(
    @InjectRepository(BestResult)
    private bestResultRepository: Repository<BestResult>,
  ) {}

  async createBestResults(dto: CreateBestResultDto): Promise<BestResult> {
    const bestResult = this.bestResultRepository.create(dto);
    return await this.bestResultRepository.save(bestResult);
  }
}
