import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamPlayerDto } from '../dto/create-team-player.dto';
import { TeamPlayer } from '../entities/team-player.entity';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamPlayerService {
  constructor(
    @InjectRepository(TeamPlayer)
    private readonly teamPlayerRepository: Repository<TeamPlayer>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTeamPlayer(teamPlayer: CreateTeamPlayerDto): Promise<TeamPlayer> {
    const existingTeamPlayer = await this.teamPlayerRepository.findOne({
      where: {
        teamId: teamPlayer.teamId,
        runnerId: teamPlayer.runnerId,
        active: true,
      },
    });

    // Check if the runner is already in the team

    if (existingTeamPlayer) {
      throw new BadRequestException('Runner is already in the team');
    }

    return this.teamPlayerRepository.save({
      ...teamPlayer,
      memberSince: new Date(),
    });
  }

  async getRunnerTeams(
    runnerId: number,
  ): Promise<{ active: Team[]; past: Team[] }> {
    const pastRunnerTeams = await this.teamPlayerRepository.find({
      where: {
        runnerId: runnerId,
        active: false,
      },
      relations: ['team', 'team.coach', 'team.country'],
    });

    const activeRunnerTeams = await this.teamPlayerRepository.find({
      where: {
        runnerId: runnerId,
        active: true,
      },
      relations: [
        'team',
        'team.coach',
        'team.country',
        'team.teamRunners',
        'team.teamRunners.runner',
      ],
    });

    return {
      active: activeRunnerTeams.map((teamPlayer) => teamPlayer.team),
      past: pastRunnerTeams.map((teamPlayer) => teamPlayer.team),
    };
  }
}
