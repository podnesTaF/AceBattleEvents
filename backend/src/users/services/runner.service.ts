import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Best } from 'src/bests/entities/best.entity';
import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { createDateFromDDMMYYYY } from 'src/utils/date-formater';
import { Repository } from 'typeorm';
import { CreateRunnerDto } from '../dtos/create-runner.dto';
import { Runner } from '../entities/runner.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RunnerService {
  constructor(
    @InjectRepository(Runner)
    private repository: Repository<Runner>,
    @InjectRepository(Best)
    private bestsRepository: Repository<Best>,
  ) {}

  async create(dto: CreateRunnerDto, user: User) {
    const runner = new Runner();

    runner.user = user;
    runner.selfDefinedPB = [];
    runner.selfDefinedSB = [];
    runner.gender = dto.gender;
    const date = createDateFromDDMMYYYY(dto.dateOfBirth);
    runner.dateOfBirth = date.toDateString();
    for (let i = 0; i < dto.personalBests.length; i++) {
      const best = await this.bestsRepository.save({
        distanceInCm: dto.personalBests[i].distanceInCm,
        timeInMs: dto.personalBests[i].timeInMs,
      });
      runner.selfDefinedPB.push(best);
    }

    for (let i = 0; i < dto.seasonBests.length; i++) {
      const best = await this.bestsRepository.save({
        distanceInCm: dto.seasonBests[i].distanceInCm,
        timeInMs: dto.seasonBests[i].timeInMs,
      });
      runner.selfDefinedSB.push(best);
    }
    runner.category = dto.category;

    return this.repository.save(runner);
  }

  async findAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder('runner')
      .leftJoinAndSelect('runner.user', 'user')
      .leftJoinAndSelect('user.image', 'image')
      .leftJoinAndSelect('runner.teamsAsRunner', 'teams')
      .leftJoinAndSelect('user.country', 'country')
      .addOrderBy('runner.rank', 'ASC');

    if (query.country) {
      qb.andWhere('country.name LIKE :country', {
        country: `%${query.country}%`,
      });
    }

    if (query.team) {
      qb.andWhere('teams.name LIKE :team', {
        team: `%${query.team}%`,
      });
    }

    if (query.gender) {
      qb.andWhere('runner.gender = :gender', {
        gender: query.gender,
      });
    }

    if (query.name) {
      qb.andWhere('user.name LIKE :name', {
        name: `%${query.name}%`,
      });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const athletes = await qb.getMany();

    return {
      athletes,
      totalPages,
    };
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async getRunnerRank(gender: string, userPoints: number | null) {
    if (!userPoints) {
      return null;
    }
    const rating = await this.repository
      .createQueryBuilder('runner')
      .andWhere('runner.totalPoints > 0')
      .andWhere('runner.totalPoints < :userPoints', { userPoints })
      .andWhere('runner.gender = :gender', { gender })
      .getCount();

    return rating + 1;
  }

  async changeTotalPointsByAddedResult(result: RunnerResult) {
    const runner = await this.repository.findOne({
      where: { id: result.runner.id },
      relations: ['results'],
    });

    const resultsLen = runner.results.length;

    const pointsToAdd = this.calculatePoints(
      result.distance,
      result.finalResultInMs,
      resultsLen,
    );

    runner.totalPoints += pointsToAdd;

    return this.repository.save(runner);
  }

  calculatePoints(distance: number, time: number, resultsCount: number) {
    if (distance === 160934) {
      return time / resultsCount;
    } else {
      const toMultiply = 160934 / distance;
      const pointsWithoutExtra = time * toMultiply;
      let toMultiplyExtra = 0.12 * (80000 / distance);
      if (distance < 70000) {
        toMultiplyExtra += 0.03;
      }
      const extraPoints = pointsWithoutExtra * toMultiplyExtra;

      const points = pointsWithoutExtra + extraPoints;
      const pointsToAdd = points / resultsCount;
      return Math.ceil(pointsToAdd);
    }
  }

  async calculateUsersPoints(gender?: string) {
    let runners = await this.repository.find({
      where: { gender: gender || 'male' },
      relations: ['results', 'results.splits'],
    });

    const runnersWithPoints = runners.map((runner) => {
      const resultsLen = runner.results.length;
      if (resultsLen === 0) {
        return { ...runner, totalPoints: 0 };
      }
      const totalPoints = runner.results.reduce((acc, curr) => {
        const split = curr.splits[curr.splits.length - 1];
        let res = split.resultInMs;

        if (curr.splits[0].resultInMs > 20000) {
          res = split.resultInMs - curr.splits[0].resultInMs;
        }

        console.log(runner.user.surname, split.distance, res);
        return this.calculatePoints(split.distance, res, resultsLen) + acc;
      }, 0);
      return { ...runner, totalPoints };
    });

    runners = runnersWithPoints;

    await this.repository.save(runners);
    return runners.sort((a, b) => a.totalPoints - b.totalPoints);
  }

  async updateRanking(gender: string) {
    let runners = await this.repository.find({
      where: { gender: gender || 'male' },
    });

    runners = runners.filter((r) => r.totalPoints > 0);

    runners.sort((a, b) => a.totalPoints - b.totalPoints);

    runners.forEach((runner, idx) => {
      runner.rank = idx + 1;
    });

    return this.repository.save(runners);
  }

  async updatePersonalBestsForAllRunners() {
    let runners = await this.repository.find({
      relations: ['results', 'personalBests'],
    });

    runners = runners.map((runner) => {
      const bestResults = {};

      for (const result of runner.results) {
        if (
          !bestResults[result.distance] ||
          bestResults[result.distance].finalResultInMs > result.finalResultInMs
        ) {
          bestResults[result.distance] = result;
        }
      }
      return { ...runner, personalBests: Object.values(bestResults) };
    });

    return this.repository.save(runners);
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total players': count };
  }
}
