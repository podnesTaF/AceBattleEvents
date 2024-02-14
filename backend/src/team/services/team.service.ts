import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamPlayer } from '../entities/team-player.entity';
import { Team } from '../entities/team.entity';
import { TeamPlayerService } from './team-player.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly teamPlayerService: TeamPlayerService,
  ) {}

  async createTeam({
    user,
    dto,
  }: {
    user: AuthenticatedUser;
    dto: CreateTeamDto;
  }): Promise<Team> {
    // check if user is a coach
    if (user.roles.some((role) => role.name === 'coach') === false) {
      throw new UnauthorizedException('User is not a coach');
    }

    // Create a new team
    const { runners, ...teamDto } = dto;

    const team = await this.teamRepository.save({
      ...teamDto,
      coachId: user.id,
      runners: [],
    });

    // Create team players in runners arr in the dto is not empty

    if (runners.length > 0) {
      const teamPlayers = await this.createTeamPlayersByRunnerIds(
        user.id,
        runners,
        team.id,
      );

      team.runners = teamPlayers;
    }

    // Save and Return the created team

    return this.teamRepository.save(team);
  }

  async createTeamPlayersByRunnerIds(
    coachId: number,
    runners: number[],
    teamId: number,
  ): Promise<TeamPlayer[]> {
    const promises = runners.map(async (runnerId) => {
      // check if the coach has the runner in runners
      const runner = await this.userRepository.findOne({
        where: { id: runnerId },
        relations: ['runnerCoaches'],
      });

      if (
        runner.runnerCoaches.some(
          (rc) => rc.coachId === coachId && rc.active,
        ) === false
      ) {
        throw new UnauthorizedException(
          'Coach does not have the runner in runners',
        );
      }

      // Create the team player
      return await this.teamPlayerService.createTeamPlayer({
        teamId: teamId,
        runnerId: runnerId,
      });
    });

    return await Promise.all(promises);
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['teamRunners', 'country', 'gender', 'category', 'coach'],
    });
  }
}
