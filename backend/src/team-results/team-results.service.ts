import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from 'src/race/entities/race.entity';
import { RunnerResultsService } from 'src/runner-results/runner-results.service';
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
    private runnerResultService: RunnerResultsService,
  ) {}

  async create(dto: CreateTeamResultDto) {
    const race = await this.raceRepository.findOne({
      where: { id: dto.raceId },
    });
    const team = await this.teamRepository.findOne({
      where: { id: dto.teamId },
      relations: ['personalBest'],
    });

    const teamResult = await this.repository.save({
      resultInMs: dto.resultInMs,
      race,
      team,
    });

    for (let results of dto.runnerResults) {
      await this.runnerResultService.create(results, teamResult.id);
    }

    // if (team.personalBest) {
    //   if (team?.personalBest?.resultInMs > teamResult.resultInMs) {
    //     team.personalBest = teamResult;
    //   }
    // } else {
    //   team.personalBest = teamResult;
    // }
    // await this.teamRepository.save(team);

    await this.changeTotalPointByAddedResult(teamResult);

    await this.updateRanking(teamResult.team.gender);

    return this.repository.save(teamResult);
  }

  async getAllTeamResults(queries: { limit?: number; page?: number }) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;
    const totalCount = await this.repository.count();
    const totalPages = Math.ceil(totalCount / limit);

    const data = await this.repository.find({
      relations: [
        'runnerResults',
        'race',
        'race.teams',
        'race.event',
        'team',
        'runnerResults.runner',
      ],
      skip: offset,
      take: limit,
    });

    return {
      data,
      totalPages,
    };
  }

  async getClubResults(clubId: number, queries: any) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;

    const totalCount = await this.repository
      .createQueryBuilder('teamResult')
      .leftJoin('teamResult.team', 'team')
      .leftJoin('team.club', 'club')
      .where('club.id = :clubId', { clubId })
      .getCount();

    const qb = this.repository
      .createQueryBuilder('teamResult')
      .leftJoinAndSelect('teamResult.team', 'team')
      .leftJoinAndSelect('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .where('team.clubId = :clubId', { clubId });

    if (queries.year) {
      const year = +queries.year;
      if (!isNaN(year)) {
        qb.andWhere('YEAR(event.startDateTime) = :year', { year });
      }
    }

    if (queries.category) {
      qb.andWhere('event.category = :category', { category: queries.category });
    }

    qb.offset(offset)
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
      ]);

    const res = await qb.getRawMany();

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

  async updateTeamTime(
    id: number,
    newTime?: number,
    teamId?: number,
    oldTeamId?: number,
  ) {
    const teamResult = await this.repository.findOne({
      where: { id },
      relations: ['team', 'race'],
    });

    if (newTime) {
      teamResult.resultInMs = newTime;
    }

    if (teamId && oldTeamId) {
      const newTeam = await this.teamRepository.findOne({
        where: { id: teamId },
      });

      const race = await this.raceRepository.findOne({
        where: { id: teamResult.race.id },
        relations: ['teams', 'winner'],
      });

      race.teams = race.teams.filter((t) => t.id !== oldTeamId);

      race.teams.push(newTeam);

      if (race.winner?.id === oldTeamId) {
        race.winner = newTeam;
      }

      await this.raceRepository.save(race);

      teamResult.team = newTeam;
    }

    return this.repository.save(teamResult);
  }

  async updateRanking(gender: string) {
    let teams = await this.teamRepository.find({
      where: { gender },
    });

    teams = teams
      .filter((t) => t.totalPoints > 0)
      .sort((a, b) => a.totalPoints - b.totalPoints);

    teams.forEach((team, idx) => {
      team.rank = idx + 1;
    });

    return this.teamRepository.save(teams);
  }

  async changeTotalPointByAddedResult(result: TeamResult) {
    const team = await this.teamRepository.findOne({
      where: { id: result.team.id },
      relations: ['results'],
    });

    const resLength = team.results.length;

    if (resLength === 0) {
      team.totalPoints = result.resultInMs;
    } else {
      team.totalPoints += result.resultInMs / resLength;
    }

    return this.teamRepository.save(team);
  }
}
