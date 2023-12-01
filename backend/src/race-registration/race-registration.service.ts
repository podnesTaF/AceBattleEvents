import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Race } from "src/race/entities/race.entity";
import { TeamRaceRunner } from "src/team-race-runner/entities/team-race-runner.entity";
import { Team } from "src/teams/entities/team.entity";
import { Runner } from "src/users/entities/runner.entity";
import { Repository } from "typeorm";
import { CheckInDto } from "./dto/check-in.dto";
import { CreateRaceRegistrationDto } from "./dto/create-race-registration.dto";
import { UpdateRaceRegistrationDto } from "./dto/update-race-registration.dto";
import { RaceRegistration } from "./entities/race-registration.entity";

@Injectable()
export class RaceRegistrationService {
  constructor(
    @InjectRepository(RaceRegistration)
    private readonly repository: Repository<RaceRegistration>,
    @InjectRepository(TeamRaceRunner)
    private readonly teamRaceRunnerRepository: Repository<TeamRaceRunner>,
    @InjectRepository(Runner)
    private readonly runnerRepository: Repository<Runner>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  async create(dto: CreateRaceRegistrationDto) {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: dto.teamId },
    });

    const race = await this.raceRepository.findOneOrFail({
      where: { id: dto.raceId },
      relations: [
        "teamRegistrations",
        "teamRegistrations.team",
        "event.teamRegistrations.team",
      ],
    });

    if (
      race.teamRegistrations.find(
        (registration) => registration.team.id === team.id,
      )
    ) {
      throw new ForbiddenException(
        `The team ${team.name} with id: ${team.id} is already registered for this race`,
      );
    }

    return this.repository.save({
      team,
      race,
    });
  }

  async checkInTeamForRace(dto: CheckInDto, userId: number) {
    const registration = await this.repository.findOneOrFail({
      where: { id: dto.raceRegistrationId },
      relations: ["team", "team.players", "team.manager", "team.manager.user"],
    });

    if (registration.team.manager.user.id !== userId)
      throw new ForbiddenException("You are not allowed to check in this team");

    if (registration.checkedIn)
      throw new BadRequestException("This team is already checked in");

    const notTeamRunners = dto.runnerIds.filter((rId) =>
      registration.team.players.every((p) => p.id !== rId),
    );

    if (notTeamRunners.length > 0) {
      throw new BadRequestException(
        `Some of the runners (ids: ${notTeamRunners.join(
          ", ",
        )}) are not part of the team`,
      );
    }

    const runners = [];

    for (const runnerId of dto.runnerIds) {
      const runner = await this.runnerRepository.findOneOrFail({
        where: { id: runnerId },
      });

      runners.push(runner);
    }

    const teamRaceRunners = [];

    for (const runner of runners) {
      const teamRaceRunner = await this.teamRaceRunnerRepository.save({
        runner,
        raceRegistration: registration,
      });

      teamRaceRunners.push(teamRaceRunner);
    }

    registration.checkedIn = true;

    registration.teamRaceRunners = teamRaceRunners;

    await this.repository.save(registration);

    return { success: true };
  }

  async approveRegistration(id: number) {
    const registration = await this.repository.findOneOrFail({
      where: { id },
    });

    registration.approved = true;

    registration.approvedAt = new Date();

    return this.repository.save(registration);
  }

  findAll() {
    return `This action returns all raceRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raceRegistration`;
  }

  update(id: number, updateRaceRegistrationDto: UpdateRaceRegistrationDto) {
    return `This action updates a #${id} raceRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} raceRegistration`;
  }
}
