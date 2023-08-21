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

  getClubResults(clubId: number) {
    return this.repository
      .createQueryBuilder('teamResult')
      .leftJoinAndSelect('teamResult.team', 'team')
      .leftJoinAndSelect('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .where('team.clubId = :clubId', { clubId })
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
  }

  getTeamResults(teamId: number) {
    return this.repository
      .createQueryBuilder('teamResult')
      .leftJoinAndSelect('teamResult.team', 'team')
      .leftJoinAndSelect('teamResult.race', 'race')
      .leftJoin('race.event', 'event')
      .leftJoin('race.winner', 'winner')
      .where('team.id = :teamId', { teamId })
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
  }
}
