import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubService } from "src/club/club.service";
import { CountryService } from "src/country/country.service";
import { Event } from "src/events/entities/event.entity";
import { PlayersService } from "src/players/players.service";
import { Coach } from "src/users/entities/coach.entity";
import { User } from "src/users/entities/user.entity";
import { RunnerService } from "src/users/services/runner.service";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team.dto";
import { Team } from "./entities/team.entity";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    private playersService: PlayersService,

    private runnerService: RunnerService,
    private countryService: CountryService,
    private clubService: ClubService,
  ) {}

  async create(dto: CreateTeamDto, managerId: number) {
    const players = [];

    for (let i = 0; i < dto.players.length; i++) {
      const player = await this.runnerService.findById(dto.players[i]);
      players.push(player);
    }

    const coach = await this.coachRepository.findOne({
      where: { id: dto.coachId },
    });

    const club = await this.clubService.findPure(dto.clubId);

    const manager = await this.runnerService.findById(managerId);

    const country = await this.countryService.findById(dto.countryId);

    return this.repository.save({
      name: dto.name,
      club: club,
      city: dto.city,
      gender: dto.gender,
      country,
      logo: dto.logo,
      teamImage: dto.teamImage,
      coach,
      players,
      manager,
    });
  }

  async register(
    dto: { teamId: number; eventId: number; txHash: string; wallet: string },
    userId: number,
  ) {
    const team = await this.repository.findOne({
      where: { id: dto.teamId },
      relations: ["events"],
    });

    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId },
      relations: ["teams"],
    });

    if (!team || !event) {
      throw new NotFoundException("Team or event not found");
    }

    team.events.push(event);
    event.teams.push(team);

    await this.repository.save(team);
    await this.eventRepository.save(event);
  }

  async findAll(queries: any, userId?: number) {
    const page = +queries.page || 1; // Default to page 1 if not provided
    const limit = +queries.limit || 20;

    const qb = this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.country", "country")
      .leftJoinAndSelect("team.coach", "coach")
      .leftJoinAndSelect("team.players", "players")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.events", "events")
      .leftJoinAndSelect("team.personalBest", "personalBest");

    if (queries.user) {
      qb.where("team.managerId = :id", { id: userId });

      return qb.getMany();
    }

    if (queries.country) {
      qb.where("country.name = :name", { name: queries.country });
    }

    if (queries.gender) {
      qb.andWhere("team.gender = :gender", { gender: queries.gender });
    }

    if (queries.name) {
      qb.andWhere("team.gender = :name", { name: queries.name });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const teams = await qb.getMany();

    return {
      teams,
      totalPages,
    };
  }

  async findTopTeams({
    count,
    gender,
  }: {
    count?: string;
    gender?: "male" | "female";
  }) {
    const returnData = {
      male: null,
      female: null,
    };

    if (!gender) {
      returnData.male = await this.getTopTeamsByGender(+count || 1, "male");
      returnData.female = await this.getTopTeamsByGender(+count || 1, "female");
    } else {
      returnData[gender] = await this.getTopTeamsByGender(+count || 1, gender);
    }

    return returnData;
  }

  async findAllByEventId(eventId: number, { category }: { category?: string }) {
    const qb = this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.eventRegistrations", "eventRegistration")
      .leftJoinAndSelect("eventRegistration.event", "event")
      .where("event.id = :eventId", { eventId })
      .leftJoinAndSelect("eventRegistration.coach", "coach")
      .leftJoinAndSelect("coach.user", "user")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.teamImage", "teamImage")
      .leftJoinAndSelect("team.country", "country")
      .leftJoinAndSelect("team.personalBest", "personalBest");

    if (category) {
      qb.andWhere("team.gender = :category", { category });
    }

    return qb.getMany();
  }

  async getTopTeamsByGender(count: number, gender: "male" | "female") {
    return this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.teamImage", "teamImage")
      .where("team.gender = :gender", { gender })
      .orderBy("team.rank", "ASC")
      .take(count)
      .getMany();
  }

  async findAllManagerTeams(
    userId: number,
    { unregistered, eventId }: { unregistered?: boolean; eventId?: string },
  ) {
    const qb = this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.country", "country")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.teamImage", "teamImage")
      .leftJoinAndSelect("team.manager", "manager")
      .leftJoinAndSelect("team.coach", "coach")
      .leftJoinAndSelect("manager.user", "user")
      .where("user.id = :userId", { userId });

    if (unregistered && eventId) {
      qb.leftJoinAndSelect("team.eventRegistrations", "eventRegistrations")
        .leftJoinAndSelect("eventRegistrations.event", "event")
        .andWhere("event.id != :eventId", { eventId: +eventId })
        .orWhere("eventRegistrations.id is null")
        .andWhere("user.id = :userId", { userId });
    }

    const teams = await qb.getMany();

    return teams;
  }

  findAllPreviews() {
    return this.repository.find({
      relations: ["logo"],
      select: ["id", "name", "logo"],
    });
  }

  async getRegistrations(
    userId: number,
    query: { page?: string; limit?: string },
  ) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const teams = await this.repository.find({
      where: { manager: { id: +userId } },
      relations: [
        "events",
        "events.teams",
        "events.location",
        "events.location.country",
        "events.prizes",
        "coach",
      ],
      order: { id: "ASC" },
    });
    const removeUnnecessary = (event: Event) => {
      const totalPrize = event.prizes.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );
      delete event.prizes;
      delete event.teams;

      return {
        ...event,
        totalPrize,
      };
    };

    const removeUnnecessaryForTeam = (team: Team) => {
      delete team.events;
      return team;
    };

    const teamsForEvents = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].events.length; j++) {
        if (teams[i].events[j].startDateTime < new Date()) continue;
        teamsForEvents.push({
          event: removeUnnecessary(teams[i].events[j]),
          team: teams[i],
        });
      }
    }

    for (let i = 0; i < teamsForEvents.length; i++) {
      teamsForEvents[i].team = removeUnnecessaryForTeam(teamsForEvents[i].team);
    }

    const totalItems = teamsForEvents.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
      teamsForEvents: teamsForEvents.slice(startIndex, endIndex),
      totalPages,
    };
  }

  async getRegistrationsByPlayerId(
    playerId: number,
    { past, year }: { past?: boolean; year?: string },
  ) {
    const qb = this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.events", "events")
      .leftJoinAndSelect("events.location", "location")
      .leftJoinAndSelect("location.country", "country")
      .leftJoinAndSelect("team.coach", "coach")
      .leftJoinAndSelect("team.players", "players")
      .where("players.id = :id", { id: playerId });

    if (past) {
      qb.andWhere("events.endDate < :now", { now: new Date() });
    } else {
      qb.andWhere("events.endDate > :now", { now: new Date() });
    }

    if (year) {
      qb.andWhere("EXTRACT(YEAR FROM events.startDateTime) = :year", { year });
    }

    const teams = await qb.getMany();

    const transformedData = teams.flatMap((team) => {
      const eventList = team.events;

      return eventList.map((event) => {
        const { id, name, gender, city, coach } = team;
        const teamInfo = { id, name, gender, city, coach };

        const {
          id: eventId,
          title,
          description,
          startDateTime,
          endDate,
          location,
        } = event;
        const eventInfo = {
          id: eventId,
          title,
          description,
          startDateTime,
          endDate,
          location,
        };

        return { event: eventInfo, team: teamInfo };
      });
    });

    return transformedData;
  }

  async findAllByUser(userId?: number) {
    const teams = await this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.players", "player")
      .leftJoinAndSelect("team.coach", "coach")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.country", "country")
      .leftJoinAndSelect("team.club", "club")
      .leftJoinAndSelect("team.personalBest", "personalBest")
      .leftJoinAndSelect("club.runners", "runners")
      .leftJoinAndSelect("club.manager", "manager")
      .where("player.id = :runnerId", { runnerId: userId })
      .orWhere("manager.user.id = :managerId", {
        managerId: userId,
      })
      .leftJoinAndSelect("team.players", "players")
      .leftJoinAndSelect("players.user", "user")
      .getMany();
    return teams;
  }

  async findOne(id: number, userId?: number) {
    const { followersCount } = await this.repository
      .createQueryBuilder("team")
      .where("team.id = :id", { id })
      .leftJoin("team.followers", "followers")
      .select("COUNT(followers.id)", "followersCount")
      .getRawOne();

    const team = await this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.teamImage", "teamImage")
      .leftJoinAndSelect("team.events", "events")
      .leftJoinAndSelect("team.players", "players")
      .leftJoinAndSelect("players.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("user.country", "userCountry")
      .leftJoinAndSelect("team.coach", "coach")
      .leftJoinAndSelect("coach.user", "coachUser")
      .leftJoinAndSelect("coachUser.image", "coachImage")
      .leftJoinAndSelect("team.logo", "logo")
      .leftJoinAndSelect("team.country", "country")
      .leftJoinAndSelect("team.personalBest", "personalBest")
      .leftJoinAndSelect("team.races", "races")
      .leftJoinAndSelect("races.teams", "raceTeams")
      .leftJoinAndSelect("races.teamResults", "teamResults")
      .leftJoinAndSelect("teamResults.team", "resultTeam")
      .leftJoinAndSelect(
        "team.followers",
        "followers",
        "followers.id = :userId",
        { userId },
      )
      .where("team.id = :id", { id })
      .getOne();

    const isFollowing = team.followers.length > 0;

    return { ...team, followersCount, isFollowing };
  }

  async update(
    id: number,
    updateTeamDto: {
      name: string;
      city: string;
      gender: string;
      coachId: number;
      players: number[];
    },
  ) {
    const team = await this.repository.findOne({
      where: { id },
      relations: ["players", "coach"],
    });

    const players = [];
    for (let i = 0; i < updateTeamDto.players.length; i++) {
      const player = await this.runnerService.findById(
        updateTeamDto.players[i],
      );
      players.push(player);
    }

    const coach = await this.coachRepository.findOne({
      where: { id: updateTeamDto.coachId },
    });

    team.name = updateTeamDto.name || team.name;
    team.city = updateTeamDto.city || team.city;
    team.gender = updateTeamDto.gender || team.gender;
    team.coach = coach || team.coach;
    team.players = players || team.players;

    return this.repository.save({
      ...team,
    });
  }

  async followTeam({ teamId, userId }: { teamId: number; userId: number }) {
    const team = await this.repository.findOne({
      where: { id: teamId },
      relations: ["followers"],
    });
    if (!team) {
      return null;
    }
    const user = team.followers.find((follower) => follower.id === userId);
    if (user) {
      return { followersCount: team.followers.length };
    }

    team.followers.push({ id: userId } as User);
    await this.repository.save(team);
    return { followersCount: team.followers.length };
  }

  async unfollowTeam({ teamId, userId }: { teamId: number; userId: number }) {
    const team = await this.repository.findOne({
      where: { id: teamId },
      relations: ["followers"],
    });

    if (!team) {
      return null;
    }
    const user = team.followers.find((follower) => follower.id === userId);
    if (!user) {
      return null;
    }
    team.followers = team.followers.filter(
      (follower) => follower.id !== userId,
    );
    await this.repository.save(team);
    return { followersCount: team.followers.length };
  }

  async count() {
    const count = await this.repository.count();
    return { "Teams count": count };
  }

  async countAll() {
    const res = [];
    const playersCount = await this.playersService.count();
    const usersCount = await this.runnerService.count();
    const teamsCount = await this.count();
    const eventsCount = await this.eventRepository.count();
    res.push(playersCount, usersCount, teamsCount, {
      "total events": eventsCount,
    });

    return res;
  }

  findAllSnippetByEventId(eventId: number) {
    return this.repository
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.events", "event")
      .where("event.id = :eventId", { eventId })
      .select(["team.id", "team.name"])
      .getMany();
  }

  async updatePersonalBestsForAllTeams() {
    let teams = await this.repository.find({
      relations: ["personalBest", "results"],
    });

    teams = teams.map((team) => {
      const results = team.results.sort((a, b) => a.resultInMs - b.resultInMs);
      const personalBest = results[0];

      return {
        ...team,
        personalBest,
      };
    });

    return this.repository.save(teams);
  }

  async calculateTeamsPoints(gender: string) {
    let teams = await this.repository.find({
      where: { gender },
      relations: ["results"],
    });

    const teamsWithPoints = teams.map((team) => {
      const resLen = team.results.length;

      if (resLen === 0) {
        return {
          ...team,
          totalPoints: 0,
        };
      }

      const totalPoints = team.results.reduce(
        (acc, curr) => acc + curr.resultInMs / resLen,
        0,
      );
      return { ...team, totalPoints };
    });

    teams = teamsWithPoints;

    return this.repository.save(teams);
  }
}
