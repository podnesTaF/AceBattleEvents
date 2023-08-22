import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from 'src/race/entities/race.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamResultDto } from './dto/create-team-result.dto';
import { TeamResult } from './entities/team-results.entity';

@Injectable()
export class TeamResultsService {
  constructor(
    @InjectRepository(TeamResult)
    private repository: Repository<TeamResult>,
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateTeamResultDto) {
    const race = await this.raceRepository.findOne({
      where: { id: dto.raceId },
    });
    const team = await this.teamRepository.findOne({
      where: { id: dto.teamId },
    });

    return this.repository.save({
      resultInMs: dto.resultInMs,
      race,
      team,
    });
  }

  async getClubResults(
    clubId: number,
    queries: { limit?: number; page?: number },
  ) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;

    const totalCount = await this.repository
      .createQueryBuilder('teamResult')
      .leftJoin('teamResult.team', 'team')
      .leftJoin('team.club', 'club')
      .where('club.id = :clubId', { clubId })
      .getCount();

    const res = await this.repository
      .createQueryBuilder('teamResult')
      .leftJoinAndSelect('teamResult.team', 'team')
      .leftJoinAndSelect('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .where('team.clubId = :clubId', { clubId })
      .offset(offset)
      .limit(limit)
      .select([
        'teamResult.id',
        'teamResult.resultInMs',
        'teamResult.raceId',
        'teamResult.teamId',
        'team.id',
        'team.name',
        'team.gender',
        'team.clubId',
        'winner.id',
        'race.startTime',
        'event.title',
      ])
      .getRawMany();

    return {
      results: res,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async getTeamResults(
    teamId: number,
    queries: { limit?: number; page?: number },
  ) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;

    const totalCount = await this.repository
      .createQueryBuilder('teamResult')
      .leftJoin('teamResult.team', 'team')
      .where('team.id = :teamId', { teamId })
      .getCount();

    const res = await this.repository
      .createQueryBuilder('teamResult')
      .leftJoinAndSelect('teamResult.team', 'team')
      .leftJoinAndSelect('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .where('team.id = :teamId', { teamId })
      .offset(offset)
      .limit(limit)
      .select([
        'teamResult.id',
        'teamResult.resultInMs',
        'teamResult.raceId',
        'teamResult.teamId',
        'team.id',
        'team.name',
        'team.gender',
        'team.clubId',
        'winner.id',
        'race.startTime',
        'event.title',
      ])
      .getRawMany();

    return {
      results: res,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}
