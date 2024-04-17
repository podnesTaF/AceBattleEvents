import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BestResult } from 'src/modules/best-results/entities/best-result.entity';
import { Repository } from 'typeorm';
import { CreateStandardDto } from './dto/create-standard.dto';
import { Standard } from './entities/standard.entity';

@Injectable()
export class StandardService {
  constructor(
    @InjectRepository(Standard)
    private standardRepository: Repository<Standard>,
  ) {}

  async createStandard(body: CreateStandardDto): Promise<Standard> {
    const standard = this.standardRepository.create(body);
    return await this.standardRepository.save(standard);
  }

  async createManyStandards(bodies: CreateStandardDto[]): Promise<Standard[]> {
    const standards = this.standardRepository.create(bodies);
    return await this.standardRepository.save(standards);
  }

  async findStandardsForDistancesAndGender(
    distances: number[],
    genderId?: number,
  ): Promise<Standard[]> {
    const query = this.standardRepository
      .createQueryBuilder('standard')
      .leftJoinAndSelect('standard.category', 'category')
      .where('standard.distanceId IN (:...distances)', { distances });

    if (genderId) {
      query.andWhere('standard.genderId = :genderId', { genderId });
    }

    return await query.getMany();
  }

  async findHighestRankingStandard(
    bestResults: BestResult[],
    genderId: number,
  ): Promise<Standard | undefined> {
    if (bestResults.length === 0) {
      return { category: null } as Standard;
    }

    const promises = bestResults.map(async (bestResult) => {
      return this.standardRepository
        .createQueryBuilder('standard')
        .leftJoinAndSelect('standard.category', 'category')
        .where('standard.distanceId = :distanceId', {
          distanceId: bestResult.distanceId,
        })
        .andWhere('standard.genderId = :genderId', { genderId })
        .andWhere('standard.timeInMs >= :timeInMs', {
          timeInMs: bestResult.timeInMs,
        })
        .orWhere('standard.timeInMs IS NULL')
        .orderBy('category.rank', 'ASC')
        .getOne();
    });

    const followedStandards = await Promise.all(promises);

    if (followedStandards.length === 0) {
      return { category: null } as Standard;
    }
    const validStandards = followedStandards.filter(Boolean);

    return validStandards.sort((a, b) => a.category.rank - b.category.rank)[0];
  }
}
