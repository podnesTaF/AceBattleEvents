import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SplitsService } from 'src/splits/splits.service';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { RunnerService } from 'src/users/services/runner.service';
import { Repository } from 'typeorm';
import { CreateRunnerResultDto } from './dto/create-runner-result.dto';
import { RunnerResult } from './entities/runner-results.entity';

@Injectable()
export class RunnerResultsService {
  constructor(
    @InjectRepository(RunnerResult)
    private repository: Repository<RunnerResult>,
    @InjectRepository(TeamResult)
    private teamResRepository: Repository<TeamResult>,
    @InjectRepository(Runner)
    private runnerRepository: Repository<Runner>,
    private splitService: SplitsService,
    private runnerService: RunnerService,
  ) {}

  async create(dto: CreateRunnerResultDto, teamResultId: number) {
    const teamResult = await this.teamResRepository.findOne({
      where: { id: teamResultId },
    });

    const runner = await this.runnerRepository.findOne({
      relations: ['personalBests'],
      where: { id: dto.runnerId },
    });

    if (!runner) {
      throw new Error('Runner not found');
    }

    const runnerResult = await this.repository.save({
      teamResult,
      runner,
      distance: dto.distance,
      runnerType: dto.runnerType || null,
      finalResultInMs: dto.finalResultInMs,
    });

    runner.personalBests = runner.personalBests || [];

    const pbIdx = runner.personalBests.findIndex(
      (pb) => pb.distance === dto.distance,
    );

    if (pbIdx !== -1) {
      if (runner.personalBests[pbIdx].finalResultInMs > dto.finalResultInMs) {
        runner.personalBests[pbIdx].finalResultInMs = dto.finalResultInMs;
        await this.runnerRepository.save(runner);
      }
    } else {
      runner.personalBests.push(runnerResult);
      await this.runnerRepository.save(runner);
    }

    await this.runnerService.changeTotalPointsByAddedResult(runnerResult);

    await this.runnerService.updateRanking(runnerResult.runner.gender);

    const splits = [];

    for (const split of dto.splits) {
      const newSplit = await this.splitService.create(
        { ...split },
        runnerResult.id,
      );

      splits.push(newSplit);
    }

    return this.repository.save({
      ...runnerResult,
      splits,
    });
  }

  async getUserResults(
    runnerId: number,
    queries: {
      limit?: number;
      page?: number;
      category?: string;
      year?: string;
    },
  ) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;

    const totalCount = await this.repository
      .createQueryBuilder('runnerResult')
      .leftJoin('runnerResult.runner', 'runner')
      .where('runner.id = :runnerId', { runnerId })
      .getCount();

    const pageCount = Math.ceil(totalCount / limit);

    const qb = this.repository
      .createQueryBuilder('runnerResult')
      .leftJoinAndSelect('runnerResult.teamResult', 'teamResult')
      .leftJoin('teamResult.team', 'team')
      .leftJoin('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .leftJoin('runnerResult.pbForRunner', 'pbForRunner')
      .leftJoin('runnerResult.runner', 'runner')
      .where('runner.id = :runnerId', { runnerId });

    if (queries.category) {
      qb.andWhere('event.category = :category', { category: queries.category });
    }

    if (queries.year) {
      const year = +queries.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.startDateTime) = :year', { year });
      }
    }

    qb.offset(offset)
      .limit(limit)
      .select([
        'runnerResult.id',
        'runnerResult.distance',
        'runnerResult.finalResultInMs',
        'teamResult.id',
        'teamResult.resultInMs',
        'race.id',
        'race.startTime',
        'event.id',
        'event.title',
        'winner.id',
        'team.id',
        'pbForRunner.id',
      ]);

    const results = await qb.getRawMany();
    return {
      results,
      totalPages: pageCount,
    };
  }

  async updateResult(
    id: number,
    body: { distance?: number; finalResultInMs?: number },
  ) {
    return this.repository.update(id, body);
  }
}