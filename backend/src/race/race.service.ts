import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { RaceRegistration } from "src/race-registration/entities/race-registration.entity";
import { RaceRegistrationService } from "src/race-registration/race-registration.service";
import { Team } from "src/teams/entities/team.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateRaceDto } from "./dto/create-race.dto";
import { Race } from "./entities/race.entity";

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private repository: Repository<Race>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private raceRegistrationService: RaceRegistrationService,
  ) {}

  async createRace(dto: CreateRaceDto) {
    const event = await this.eventRepository.findOneOrFail({
      where: { id: dto.eventId },
      relations: ["teamRegistrations.team"],
    });

    let unregisteredTeamForEventIds = dto.teamIds.filter(
      (tId) => !event.teamRegistrations.some((reg) => reg.team.id === tId),
    );
    if (unregisteredTeamForEventIds.length > 0) {
      throw new BadRequestException(
        `Teams with ids: ${unregisteredTeamForEventIds.reduce(
          (acc, curr) => acc + curr + ", ",
          "",
        )} are not registered for this event`,
      );
    }

    if (event.startDateTime < new Date()) {
      throw new ForbiddenException(
        "You are not allowed to register for past events",
      );
    }

    const race = await this.repository.save({
      startTime: dto.startTime,
      event,
      name: dto.name,
    });

    const raceRegistrations = [];

    for (const teamId of dto.teamIds) {
      const raceRegistration = await this.raceRegistrationService.create({
        teamId: teamId,
        raceId: race.id,
      });

      raceRegistrations.push(raceRegistration);
    }

    race.teamRegistrations = raceRegistrations;

    return this.repository.save(race);
  }

  async getAllRaces(queries: {
    page: number;
    limit: number;
    category?: string;
    country?: string;
    year?: string;
    isFinished?: string;
    name?: string;
  }) {
    const count = await this.repository.count();
    const page = +queries?.page || 1;
    const limit = +queries?.limit || 5;

    const qb = this.repository
      .createQueryBuilder("race")
      .leftJoinAndSelect("race.event", "event")
      .leftJoinAndSelect("event.location", "location")
      .leftJoinAndSelect("location.country", "country")
      .leftJoinAndSelect("race.winner", "winner")
      .leftJoinAndSelect("race.teamResults", "teamResults")
      .leftJoinAndSelect("teamResults.team", "team");

    if (queries.name) {
      qb.andWhere("event.title LIKE :name", { name: `%${queries.name}%` });
    }

    if (queries.category) {
      qb.andWhere("event.category = :category", { category: queries.category });
    }

    if (queries.country) {
      qb.andWhere("country.name LIKE :country", {
        country: `%${queries.country}%`,
      });
    }

    if (queries.year) {
      const year = +queries.year;
      if (!isNaN(year)) {
        qb.andWhere("YEAR(event.startDateTime) = :year", { year });
      }
    }

    if (queries.isFinished) {
      qb.andWhere("winner.id IS NOT NULL");
    }

    qb.skip((page - 1) * limit).take(limit);

    const races = await qb.getMany();

    return {
      races,
      totalPages: Math.ceil(count / limit),
    };
  }

  async getRace(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: [
        "event",
        "winner",
        "teamResults",
        "teamResults.team",
        "teams",
      ],
    });
  }

  getLastMatches(query: {
    runnerId?: string;
    teamId?: string;
    managerId?: string;
  }) {
    const qb = this.repository
      .createQueryBuilder("race")
      .leftJoinAndSelect("race.event", "event")
      .leftJoinAndSelect("event.location", "location")
      .leftJoinAndSelect("location.country", "country")
      .leftJoinAndSelect("race.winner", "winner")
      .leftJoinAndSelect("race.teamResults", "teamResults")
      .leftJoinAndSelect("teamResults.team", "team");

    if (query.runnerId) {
      qb.leftJoinAndSelect("teamResults.runnerResults", "runnerResults")
        .leftJoinAndSelect("runnerResults.runner", "runner")
        .where("runner.id = :runnerId", {
          runnerId: +query.runnerId,
        });
    }

    if (query.managerId) {
      qb.leftJoinAndSelect("team.manager", "manager").where(
        "manager.id = :managerId",
        {
          managerId: +query.managerId,
        },
      );
    }

    if (query.teamId) {
      qb.andWhere("team.id = :teamId", {
        teamId: +query.teamId,
      });
    }

    qb.andWhere("race.startTime < :now", {
      now: new Date(), // Current time
    })
      .orderBy("race.startTime", "DESC") // Order by startTime in descending order
      .take(2);

    return qb.getMany();
  }

  async getFullRace(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: [
        "event",
        "winner",
        "teamResults",
        "teamResults.team",
        "teams",
        "teamResults.runnerResults",
        "teamResults.runnerResults.runner",
        "teamResults.runnerResults.runner.club",
        "teamResults.runnerResults.runner.user.country",
        "teamResults.runnerResults.runner.personalBests",
        "teamResults.runnerResults.splits",
      ],
    });
  }

  async getAllRacesByEvent(id: number, userId?: number) {
    const races = await this.repository
      .createQueryBuilder("race")
      .leftJoinAndSelect("race.teamRegistrations", "teamRegistrations")
      .leftJoinAndSelect("teamRegistrations.team", "team")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("race.event", "event")
      .where("event.id = :eventId", { eventId: id })
      .getMany();

    let user: User;
    if (userId) {
      user = await this.userRepository.findOneOrFail({
        where: { id: userId },
        relations: [
          "coach.teamRegistrations",
          "manager.teams.raceRegistrations",
        ],
      });
    }

    if (!userId || (!user.coach && !user.manager)) {
      return races;
    }

    return races.map((race) => {
      let raceRegistrationsToCheckIn: RaceRegistration[] = [];
      race.teamRegistrations.forEach((reg) => {
        if (reg.checkedIn) {
          return;
        }
        if (user.coach) {
          user.coach.teamRegistrations.forEach((teamReg) => {
            if (teamReg.team.id === reg.team.id) {
              raceRegistrationsToCheckIn.push(reg);
            }
          });
        } else if (user.manager) {
          user.manager.teams.forEach((team) => {
            if (team.id === reg.team.id) {
              raceRegistrationsToCheckIn.push(reg);
            }
          });
        }
      });

      return {
        ...race,
        availableForCheckIn: raceRegistrationsToCheckIn.length > 0,
        raceRegistrationsToCheckIn,
      };
    });
  }

  async updateWinner(teamId: number, raceId: number) {
    const winner = await this.teamRepository.findOne({ where: { id: teamId } });

    return this.repository.update(raceId, { winner });
  }

  async updateRace(
    id: number,
    body: { teamIds: number[]; startTime: string; eventId: number },
  ) {
    const race = await this.repository.findOne({
      where: { id },
      relations: ["teams", "event"],
    });

    const teams = await Promise.all(
      body.teamIds.map(async (id) => {
        const team = await this.teamRepository.findOne({ where: { id } });
        if (team) {
          return team;
        }
      }),
    );

    const event = await this.eventRepository.findOne({
      where: { id: body.eventId },
    });

    race.teams = teams || race.teams;
    race.startTime = new Date(body.startTime) || race.startTime;
    race.event = event || race.event;

    return this.repository.save(race);
  }

  deleteRace(id: number) {
    return this.repository.delete(id);
  }
}
