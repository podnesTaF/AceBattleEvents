import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryService } from "src/country/country.service";
import { LocationsService } from "src/locations/locations.service";
import { PrizesService } from "src/prizes/prizes.service";
import { Race } from "src/race/entities/race.entity";
import { RunnerResult } from "src/runner-results/entities/runner-results.entity";
import { Team } from "src/teams/entities/team.entity";
import { Runner } from "src/users/entities/runner.entity";
import { formatDate } from "src/utils/date-formater";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/create-event.dto";
import {
  UpdateEventInfo,
  UpdateEventMedia,
  UpdateEventPrizes,
} from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
    private locationsService: LocationsService,
    private prizeService: PrizesService,
    private countriesService: CountryService,
  ) {}

  async create(eventDto: CreateEventDto, storage: Storage) {
    let country = await this.countriesService.returnIfExist({
      name: eventDto.location.country,
    });

    if (!country) {
      country = await this.countriesService.create(eventDto.location.country);
    }
    const location = await this.locationsService.create(
      eventDto.location,
      country,
    );

    const prizes = [];

    for (let i = 0; i < eventDto.prizes.length; i++) {
      const prize = eventDto.prizes[i];
      const createdPrize = await this.prizeService.create(prize);
      prizes.push(createdPrize);
    }

    const {
      title,
      description,
      startDateTime,
      endDate,
      introImage,
      minorImage,
    } = eventDto;

    return this.repository.save({
      title,
      description,
      startDateTime: new Date(startDateTime),
      endDate: new Date(endDate),
      introImage: introImage || null,
      minorImage: minorImage || null,
      location,
      prizes,
    });
  }

  async getAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.introImage", "introImage")
      .leftJoinAndSelect("event.minorImage", "minorImage")
      .leftJoinAndSelect("event.location", "location")
      .leftJoinAndSelect("location.country", "country")
      .leftJoin("event.teams", "team")
      .loadRelationCountAndMap("event.teamsCount", "event.teams")
      .leftJoinAndSelect("event.prizes", "prize")
      .orderBy("event.id", "DESC");

    if (query.month) {
      const month = query.month.toLowerCase();
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1; // Get the month index (1-12)
      qb.where("EXTRACT(MONTH FROM event.startDateTime) = :monthIndex", {
        monthIndex,
      });
    }

    if (query.year) {
      const year = +query.year;
      if (!isNaN(year)) {
        qb.andWhere("YEAR(event.startDateTime) = :year", { year });
      }
    }

    if (query.name) {
      qb.andWhere("event.title LIKE :name", { name: `%${query.name}%` });
    }

    if (query.country) {
      qb.andWhere("country.name LIKE :country", {
        country: `%${query.country}%`,
      });
    }

    if (query.finished) {
      qb.andWhere("event.endDate < :now", { now: new Date() });
    } else {
      qb.andWhere("event.endDate > :now", { now: new Date() });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const events = await qb.getMany();

    const resEvents = events.map((ev) => {
      const totalPrize = ev.prizes.reduce((acc, curr) => acc + curr.amount, 0);

      delete ev.prizes;

      return {
        ...ev,
        totalPrize,
      };
    });

    return { events: resEvents, totalPages };
  }

  async getAllInShort() {
    const events = await this.repository.find({
      relations: ["introImage"],
      select: ["id", "title", "startDateTime", "introImage"],
    });
    return events.map((event) => ({
      ...event,
      startDateTime: formatDate(event.startDateTime),
    }));
  }

  getAllSnippet() {
    return this.repository.find({
      select: ["id", "title"],
    });
  }

  async getEventById(id: number) {
    const event = await this.repository.findOne({
      where: { id },
      relations: [
        "location",
        "location.country",
        "teams",
        "teams.country",
        "teams.club",
        "teams.logo",
        "teams.coach",
        "prizes",
        "teams.players",
        "introImage",
        "minorImage",
      ],
    });

    let updatedTeams = [];
    if (event) {
      event.teams.forEach((team) => {
        const membersCount = team.players.length;
        delete team.players;
        updatedTeams.push({
          ...team,
          membersCount,
        });
      });
    }

    event.teams = updatedTeams;

    return event;
  }

  async findLastEvent() {
    return this.repository.findOne({ where: { id: 25 } });
  }

  async findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async getAllResults(eventId: number) {
    const event = await this.repository.findOne({
      where: { id: eventId },
      relations: [
        "introImage",
        "races",
        "races.winner",
        "races.teams",
        "races.teamResults",
        "races.teamResults.team",
        "races.teamResults.team.logo",
        "races.teamResults.runnerResults",
        "races.teamResults.runnerResults.runner",
        "races.teamResults.runnerResults.runner.user.image",
      ],
    });

    if (event.startDateTime > new Date()) {
      return {
        notFinished: true,
        eventTitle: event.title,
      };
    }

    const mensRaces: Race[] = [];

    const womensRaces: Race[] = [];

    event.races.forEach((race) => {
      if (race.teams.some((team) => team.gender === "male")) {
        mensRaces.push(race);
      } else {
        womensRaces.push(race);
      }
    });

    // I need to map through mensRaces and count the total time for each team and then sort them by time.

    const teamResults: {
      male: {
        [teamId: number]: {
          team: Team;
          resultInMs: number;
        };
      };
      female: {
        [teamId: number]: {
          team: Team;
          resultInMs: number;
        };
      };
    } = {
      male: {},
      female: {},
    };

    addTeamResults(mensRaces, teamResults, "male");
    addTeamResults(womensRaces, teamResults, "female");

    const podium = {
      male: {
        1: null,
        2: null,
        3: null,
      },
      female: {
        1: null,
        2: null,
        3: null,
      },
    };

    addToPodium(podium, teamResults, "male");
    addToPodium(podium, teamResults, "female");

    const bestSportsmen: {
      [gender: string]: {
        runner: Runner;
        finalResultInMs: number;
      };
    } = {};

    event.races.forEach((race) => {
      race.teamResults.forEach((teamResult) => {
        teamResult.runnerResults.forEach((runnerResult) => {
          const currBest = bestSportsmen[runnerResult.runner.gender];
          if (runnerResult.distance !== 160934) return;
          if (
            !currBest ||
            runnerResult.finalResultInMs < currBest.finalResultInMs
          ) {
            bestSportsmen[runnerResult.runner.gender] = runnerResult;
          }
        });
      });
    });

    const bestJokerPair: {
      [gender: string]: {
        runners: RunnerResult[];
        finalResultInMs: number;
      };
    } = {};

    event.races.forEach((race) => {
      race.teamResults.forEach((teamResult) => {
        const pacersJokers = teamResult.runnerResults.filter(
          (res) => res.runnerType,
        );

        const firstPair = pacersJokers.filter(
          (res) => res.runnerType === "pacer-1" || res.runnerType === "joker-1",
        );

        const secondPair = pacersJokers.filter(
          (res) => res.runnerType === "pacer-2" || res.runnerType === "joker-2",
        );

        const firstPairResult = firstPair.find(
          (res) => res.runnerType === "joker-1",
        )?.finalResultInMs;

        const secondPairResult = secondPair.find(
          (res) => res.runnerType === "joker-2",
        )?.finalResultInMs;

        if (!firstPairResult || !secondPairResult) return;

        if (firstPairResult < secondPairResult) {
          if (
            !bestJokerPair[teamResult.team.gender] ||
            bestJokerPair[teamResult.team.gender].finalResultInMs >
              firstPairResult
          ) {
            bestJokerPair[teamResult.team.gender] = {
              runners: firstPair,
              finalResultInMs: firstPairResult,
            };
          }
        } else {
          if (
            !bestJokerPair[teamResult.team.gender] ||
            bestJokerPair[teamResult.team.gender].finalResultInMs >
              secondPairResult
          ) {
            bestJokerPair[teamResult.team.gender] = {
              runners: secondPair,
              finalResultInMs: secondPairResult,
            };
          }
        }
      });
    });

    const racesByType: {
      [type: string]: {
        id: number;
        name: string;
        startTime: Date;
      }[];
    } = {};

    event.races.forEach((race) => {
      if (racesByType[race.type]) {
        racesByType[race.type].push({
          id: race.id,
          name: race.name,
          startTime: race.startTime,
        });
      } else {
        racesByType[race.type] = [
          {
            id: race.id,
            name: race.name,
            startTime: race.startTime,
          },
        ];
      }
    });

    return {
      eventTitle: event.title,
      introImage: event.introImage,
      podium,
      bestSportsmen,
      bestJokerPair,
      racesByType,
      notFinished: false,
    };
  }

  async count() {
    const count = await this.repository.count();
    return { "Total Events": count };
  }

  async updateInformation(id: number, body: UpdateEventInfo) {
    const event = await this.repository.findOne({ where: { id } });
    if (!event) {
      throw new Error("Event not found");
    }

    const { title, description, startDateTime, endDate } = body;

    event.title = title || event.title;
    event.description = description || event.description;
    event.startDateTime = new Date(startDateTime) || event.startDateTime;
    event.endDate = new Date(endDate) || event.endDate;

    return this.repository.save(event);
  }

  async updatePrizes(id: number, body: UpdateEventPrizes) {
    const event = await this.repository.findOne({
      where: { id },
      relations: ["prizes"],
    });

    event.prizes = body.prizes;

    return this.repository.save(event);
  }

  async updateMedia(id: number, body: UpdateEventMedia) {
    const event = await this.repository.findOne({
      where: { id },
      relations: ["introImage", "minorImage"],
    });

    event.introImage = body.introImage || event.introImage;
    event.minorImage = body.minorImage || event.minorImage;

    return this.repository.save(event);
  }

  deleteEvent(id: number) {
    return this.repository.delete(id);
  }
}

type ITeamResults = {
  male: {
    [teamId: number]: {
      team: Team;
      resultInMs: number;
    };
  };
  female: {
    [teamId: number]: {
      team: Team;
      resultInMs: number;
    };
  };
};

export const addTeamResults = (
  races: Race[],
  teamResults: ITeamResults,
  gender: "male" | "female",
) => {
  races.forEach((race) => {
    race.teamResults.forEach((teamResult) => {
      if (teamResults[gender][teamResult.team.id]) {
        teamResults[gender][teamResult.team.id].resultInMs +=
          teamResult.resultInMs;
      } else {
        teamResults[gender][teamResult.team.id] = {
          team: teamResult.team,
          resultInMs: teamResult.resultInMs,
        };
      }
    });
  });
};

export const addToPodium = (
  podium: any,
  teamResults: ITeamResults,
  gender: "male" | "female",
) => {
  Object.values(teamResults[gender]).forEach((teamResult) => {
    if (
      !podium[gender][1] ||
      teamResult.resultInMs < podium[gender][1].resultInMs
    ) {
      podium[gender][2] = JSON.parse(JSON.stringify(podium[gender][1]));
      podium[gender][1] = teamResult;
    } else if (
      !podium[gender][2] ||
      teamResult.resultInMs < podium[gender][2].resultInMs
    ) {
      podium[gender][3] = JSON.parse(JSON.stringify(podium[gender][2]));
      podium[gender][2] = teamResult;
    } else {
      podium[gender][3] = teamResult;
    }
  });
};
