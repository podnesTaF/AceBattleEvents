import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSplitDto } from './dto/create-split.dto';
import { Split } from './entities/split.entity';

@Injectable()
export class SplitService {
  constructor(
    @InjectRepository(Split)
    private readonly splitRepository: Repository<Split>,
  ) {}

  async createManySplits(splits: CreateSplitDto[]): Promise<Split[]> {
    return this.splitRepository.save(splits);
  }

  async getFinalResults(
    raceRunnerId: number,
  ): Promise<{ finalDistanceMs: number; finalResultInMs: number }> {
    const lastSplit = await this.splitRepository.findOne({
      where: { raceRunnerId, finalSplit: true },
    });

    if (!lastSplit) {
      throw new Error('No splits found for this race runner');
    }

    const finalDistanceMs = lastSplit.distanceInCm;
    const finalResultInMs = lastSplit.resultInMs;

    return { finalDistanceMs, finalResultInMs };
  }
}
