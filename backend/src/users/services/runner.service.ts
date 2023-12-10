import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Best } from "src/bests/entities/best.entity";
import { RunnerResult } from "src/runner-results/entities/runner-results.entity";
import { Repository } from "typeorm";
import { CreateRunnerDto } from "../dtos/create-runner.dto";
import { Manager } from "../entities/manager.entity";
import { Runner } from "../entities/runner.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class RunnerService {
  constructor(
    @InjectRepository(Runner)
    private repository: Repository<Runner>,
    @InjectRepository(Best)
    private bestsRepository: Repository<Best>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>,
  ) {}

  async create(dto: CreateRunnerDto, user: User | number) {
    if (!dto.runnerAgreement || !dto.informationIsCorrect) {
      throw new ForbiddenException(
        "You must agree to the terms and conditions",
      );
    }

    const runner = new Runner();

    if (typeof user === "number") {
      const userRequested = await this.usersRepository.findOne({
        where: { id: user },
      });

      if (!userRequested) {
        throw new ForbiddenException("User not found");
      }

      if (userRequested.role === "runner") {
        throw new ForbiddenException("User is already a runner");
      }
      runner.user = userRequested;
    } else {
      if (user.role === "runner") {
        throw new ForbiddenException("User is already a runner");
      }
      runner.user = user;
    }

    runner.selfDefinedPB = [];
    runner.selfDefinedSB = [];
    runner.gender = dto.gender;
    runner.dateOfBirth = dto.dateOfBirth;
    for (let i = 0; i < dto.personalBests.length; i++) {
      const best = await this.bestsRepository.save({
        distanceInCm: +dto.personalBests[i].distanceInCm,
        result: dto.personalBests[i].result,
      });
      runner.selfDefinedPB.push(best);
    }

    for (let i = 0; i < dto.seasonBests.length; i++) {
      const best = await this.bestsRepository.save({
        distanceInCm: +dto.seasonBests[i].distanceInCm,
        result: dto.seasonBests[i].result,
      });
      runner.selfDefinedSB.push(best);
    }

    runner.category = dto.category;

    if (dto.worldAthleticsUrl) {
      runner.worldAthleticsUrl = dto.worldAthleticsUrl;
    }

    runner.managerOption = dto.managerOption;
    if (dto.managerOption === "choose-manager") {
      const manager = await this.managersRepository.findOne({
        where: { id: dto.manager },
      });
      if (manager) {
        runner.manager = manager;
      }
    } else {
      runner.manager = null;
    }

    await this.repository.save(runner);
    await this.usersRepository.update(runner.user.id, {
      rolePending: "runner",
    });

    return { success: true };
  }

  async findAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teams")
      .leftJoinAndSelect("user.country", "country")
      .addOrderBy("runner.rank", "ASC");

    if (query.country) {
      qb.andWhere("country.name LIKE :country", {
        country: `%${query.country}%`,
      });
    }

    if (query.team) {
      qb.andWhere("teams.name LIKE :team", {
        team: `%${query.team}%`,
      });
    }

    if (query.gender) {
      qb.andWhere("runner.gender = :gender", {
        gender: query.gender,
      });
    }

    if (query.name) {
      qb.andWhere("user.name LIKE :name", {
        name: `%${query.name}%`,
      });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const athletes = await qb.getMany();

    return {
      athletes,
      totalPages,
    };
  }

  async getRunnersByManager(id: number) {
    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamsAsRunner")
      .where("teamsAsRunner.managerId = :id", { id });

    const runners = await qb.getMany();

    return runners;
  }

  async getRunnersByEvent({
    eventId,
    queries,
  }: {
    eventId: number;
    queries: { teamId?: string; gender?: string };
  }) {
    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamsAsRunner")
      .leftJoinAndSelect(
        "teamsAsRunner.eventRegistrations",
        "eventRegistration",
      )
      .leftJoinAndSelect("eventRegistration.event", "event")
      .where("event.id = :eventId", { eventId })
      .select([
        "runner.id",
        "runner.dateOfBirth",
        "runner.gender",
        "user.id",
        "user.name",
        "user.surname",
        "image.mediaUrl",
        "teamsAsRunner",
      ]);

    if (queries.gender) {
      qb.andWhere("runner.gender = :gender", { gender: queries.gender });
    }

    if (queries.teamId) {
      qb.andWhere("teamsAsRunner.id = :teamId", { teamId: queries.teamId });
    }

    const runners = await qb.getMany();

    return runners;
  }

  async getRunnersByTeam(id: number) {
    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamsAsRunner")
      .where("teamsAsRunner.id = :id", { id })
      .select([
        "runner.id",
        "runner.dateOfBirth",
        "user.name",
        "user.surname",
        "image.mediaUrl",
      ]);

    const runners = await qb.getMany();

    return runners;
  }

  async getRunnerPreviews({
    type,
    query,
    limit,
    page,
    authId,
  }: {
    type?: "search" | "all";
    query: string;
    limit?: string;
    page?: string;
    authId?: string;
  }) {
    const limitToUse = Math.max(1, !isNaN(+limit) ? +limit : 10);
    const pageToUse = Math.max(1, !isNaN(+page) ? +page : 1);

    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamsAsRunner")
      .where("runner.approved = true");

    if (type === "search" && !query) {
      return {
        runners: null,
        totalPages: 0,
      };
    }

    qb.andWhere("user.name LIKE :query OR user.surname LIKE :query", {
      query: `%${query}%`,
    });

    if (authId) {
      qb.leftJoinAndSelect("runner.followers", "followers");
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limitToUse);

    const runners = await qb.getMany();

    const runnerPreviews = runners.map((runner) => ({
      id: runner.id,
      gender: runner.gender,
      dateOfBirth: runner.dateOfBirth,
      user: runner.user,
      teamsAsRunner: runner.teamsAsRunner || [],
      isFollowing: runner.followers?.some(
        (follower) => follower.id === +authId,
      ),
    }));

    return {
      runners: runnerPreviews,
      totalPages,
    };
  }

  async getFollowings(userId: number) {
    const runners = await this.repository.find({
      where: { followers: { id: userId } },
      relations: ["user", "user.image", "teamsAsRunner"],
    });

    return runners.map((r) => ({ ...r, isFollowing: true }));
  }

  async followRunner({
    runnerId,
    userId,
  }: {
    runnerId: number;
    userId: number;
  }) {
    const runner = await this.repository.findOne({
      where: { id: runnerId },
      relations: ["followers", "user"],
    });
    if (!runner) {
      return null;
    }
    const user = runner.followers.find((follower) => follower.id === userId);
    if (user) {
      return null;
    }
    runner.followers.push({ id: userId } as User);
    await this.repository.save(runner);
    return { id: runnerId, userId: runner.user.id };
  }

  async unfollowRunner({
    runnerId,
    userId,
  }: {
    runnerId: number;
    userId: number;
  }) {
    const runner = await this.repository.findOne({
      where: { id: runnerId },
      relations: ["followers", "user"],
    });
    if (!runner) {
      return null;
    }
    const user = runner.followers.find((follower) => follower.id === userId);
    if (!user) {
      return null;
    }
    runner.followers = runner.followers.filter(
      (follower) => follower.id !== userId,
    );
    await this.repository.save(runner);
    return { id: runnerId, userId: runner.user.id };
  }

  async getTopRunners({
    count,
    gender,
  }: {
    count: number;
    gender?: string;
  }): Promise<{
    male: Runner[] | null;
    female: Runner[] | null;
  }> {
    const returnData = {
      male: null,
      female: null,
    };
    if (!gender) {
      returnData["male"] = await this.getTopRunnersByGender(count, "male");
      returnData["female"] = await this.getTopRunnersByGender(count, "female");
    } else {
      returnData[gender] = await this.getTopRunnersByGender(count, gender);
    }

    return returnData;
  }

  async getTopRunnersByGender(count: number, gender: string) {
    const qb = this.repository
      .createQueryBuilder("runner")
      .leftJoinAndSelect("runner.user", "user")
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamsAsRunner")
      .where("runner.gender = :gender", { gender })
      .orderBy("runner.rank", "ASC")
      .take(count);

    return qb.getMany();
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async getRunnerRank(gender: string, userPoints: number | null) {
    if (!userPoints) {
      return null;
    }
    const rating = await this.repository
      .createQueryBuilder("runner")
      .andWhere("runner.totalPoints > 0")
      .andWhere("runner.totalPoints < :userPoints", { userPoints })
      .andWhere("runner.gender = :gender", { gender })
      .getCount();

    return rating + 1;
  }

  async changeTotalPointsByAddedResult(result: RunnerResult) {
    const runner = await this.repository.findOne({
      where: { id: result.runner.id },
      relations: ["results"],
    });

    const resultsLen = runner.results.length;

    const pointsToAdd = this.calculatePoints(
      result.distance,
      result.finalResultInMs,
      resultsLen,
    );

    runner.totalPoints += pointsToAdd;

    return this.repository.save(runner);
  }

  calculatePoints(distance: number, time: number, resultsCount: number) {
    if (distance === 160934) {
      return time / resultsCount;
    } else {
      const toMultiply = 160934 / distance;
      const pointsWithoutExtra = time * toMultiply;
      let toMultiplyExtra = 0.12 * (80000 / distance);
      if (distance < 70000) {
        toMultiplyExtra += 0.03;
      }
      const extraPoints = pointsWithoutExtra * toMultiplyExtra;

      const points = pointsWithoutExtra + extraPoints;
      const pointsToAdd = points / resultsCount;
      return Math.ceil(pointsToAdd);
    }
  }

  async calculateUsersPoints(gender?: string) {
    let runners = await this.repository.find({
      where: { gender: gender || "male" },
      relations: ["results", "results.splits"],
    });

    const runnersWithPoints = runners.map((runner) => {
      const resultsLen = runner.results.length;
      if (resultsLen === 0) {
        return { ...runner, totalPoints: 0 };
      }
      const totalPoints = runner.results.reduce((acc, curr) => {
        const split = curr.splits[curr.splits.length - 1];
        let res = split.resultInMs;

        if (curr.splits[0].resultInMs > 20000) {
          res = split.resultInMs - curr.splits[0].resultInMs;
        }
        return this.calculatePoints(split.distance, res, resultsLen) + acc;
      }, 0);
      return { ...runner, totalPoints };
    });

    runners = runnersWithPoints;

    await this.repository.save(runners);
    return runners.sort((a, b) => a.totalPoints - b.totalPoints);
  }

  async updateRanking(gender: string) {
    let runners = await this.repository.find({
      where: { gender: gender || "male" },
    });

    runners = runners.filter((r) => r.totalPoints > 0);

    runners.sort((a, b) => a.totalPoints - b.totalPoints);

    runners.forEach((runner, idx) => {
      runner.rank = idx + 1;
    });

    return this.repository.save(runners);
  }

  async updatePersonalBestsForAllRunners() {
    let runners = await this.repository.find({
      relations: ["results", "personalBests"],
    });

    runners = runners.map((runner) => {
      const bestResults = {};

      for (const result of runner.results) {
        if (
          !bestResults[result.distance] ||
          bestResults[result.distance].finalResultInMs > result.finalResultInMs
        ) {
          bestResults[result.distance] = result;
        }
      }
      return { ...runner, personalBests: Object.values(bestResults) };
    });

    return this.repository.save(runners);
  }

  async count() {
    const count = await this.repository.count();
    return { "Total players": count };
  }
}
