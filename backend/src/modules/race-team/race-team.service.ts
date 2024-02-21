import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceRunner } from 'src/modules/race-runner/entities/race-runner.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { AuthenticatedUser } from 'src/modules/users/decorators/user.decorator';
import { In, Repository } from 'typeorm';
import { ConfirmRaceTeamDto } from './dto/confirm-race-team.dto';
import { CreateRaceTeamDto } from './dto/create-race-team.dto';
import { RaceTeam } from './entities/race-team.entity';

@Injectable()
export class RaceTeamService {
  constructor(
    @InjectRepository(RaceTeam)
    private readonly raceTeamRepository: Repository<RaceTeam>,
    @InjectRepository(RaceRunner)
    private readonly raceRunnerRepository: Repository<RaceRunner>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTeamForRace(dto: CreateRaceTeamDto) {
    const race = await this.raceRepository.findOne({
      where: { id: dto.raceId, finished: false, published: false },
    });

    if (!race) {
      throw new NotFoundException(`Race with id ${dto.raceId} not found`);
    }

    // check if the teams are allowed to participate
    const teams = await this.teamRepository.find({
      where: {
        id: In(dto.teamIds),
        registrations: { eventRaceTypeId: race.eventRaceTypeId },
      },
    });

    if (teams.length !== dto.teamIds.length) {
      throw new BadRequestException(
        `Not every team is allowed to participate in the race.`,
      );
    }

    return this.raceTeamRepository.save(
      dto.teamIds.map((teamId) => ({ teamId, raceId: dto.raceId })),
    );
  }

  // confirm race team participation, by adding race runners and chagning status to confirmed

  async confirmRaceTeamParticipation({
    raceTeamId,
    dto,
    user,
  }: {
    raceTeamId: number;
    dto: ConfirmRaceTeamDto;
    user: AuthenticatedUser;
  }): Promise<RaceTeam> {
    const raceTeam = await this.raceTeamRepository.findOne({
      where: { id: raceTeamId, confirmed: false },
      relations: ['team', 'team.teamRunners'],
    });

    if (!raceTeam) {
      throw new NotFoundException(
        `Pending race team with id ${raceTeamId} not found`,
      );
    }

    if (
      !user.roles.find((r) => r.name === 'admin') &&
      raceTeam.team.coachId !== user.id
    ) {
      throw new UnauthorizedException(
        `User is not allowed to confirm this team`,
      );
    }

    // check if the race runners exists within the team
    if (
      raceTeam.team.teamRunners.every((r) => dto.raceRunnerIds.includes(r.id))
    ) {
      throw new BadRequestException(
        `Race runners do not match the team's runners`,
      );
    }

    // add
    raceTeam.confirmed = true;

    return this.raceTeamRepository.save(raceTeam);
  }
}
