import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamPlayerDto } from '../dto/create-team-player.dto';
import { TeamPlayer } from '../entities/team-player.entity';

@Injectable()
export class TeamPlayerService {
  constructor(
    @InjectRepository(TeamPlayer)
    private readonly teamPlayerRepository: Repository<TeamPlayer>,
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
}
