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
}
