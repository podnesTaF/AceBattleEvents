import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from 'src/modules/users/decorators/user.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const team = await this.teamRepository.save({
      ...dto,
      coachId: user.id,
      runners: [],
    });

    // Save and Return the created team
    return this.teamRepository.save(team);
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['teamRunners', 'country', 'gender', 'category', 'coach'],
    });
  }

  // Get all teams previews
  findAllPreviews() {
    return this.teamRepository.find({
      select: ['id', 'name', 'logoName'],
    });
  }
}
