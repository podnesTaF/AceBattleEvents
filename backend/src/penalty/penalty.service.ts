import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import { Repository } from 'typeorm';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { Penalty } from './entities/penalty.entity';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private readonly penaltyRepository: Repository<Penalty>,
    @InjectRepository(RaceTeam)
    private readonly raceTeamRepository: Repository<RaceTeam>,
  ) {}

  async createPenalty(penalty: CreatePenaltyDto): Promise<Penalty> {
    return this.penaltyRepository.save(penalty);
  }

  async addPenaltyToRaceTeam(
    penaltyId: number,
    raceTeamId: number,
  ): Promise<RaceTeam> {
    const team = await this.raceTeamRepository.findOne({
      where: { id: raceTeamId },
    });

    if (!team) {
      throw new Error('Team not found');
    }

    const penalty = await this.penaltyRepository.findOne({
      where: { id: penaltyId },
    });

    if (!penalty) {
      throw new Error('Penalty not found');
    }

    team.penalties.push(penalty);

    return this.raceTeamRepository.save(team);
  }
}
