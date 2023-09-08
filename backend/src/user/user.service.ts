import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Club } from 'src/club/entities/club.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private countryService: CountryService,
  ) {}

  create(dto: any) {
    return this.repository.save({ ...dto });
  }

  findAll() {
    return this.repository.find({
      select: ['id', 'name', 'surname', 'email', 'city', 'country'],
    });
  }

  async findAllRunners(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.image', 'image')
      .leftJoinAndSelect('user.club', 'club')
      .leftJoinAndSelect('user.country', 'country')
      .where('user.role = :role', {
        role: 'runner',
      })
      .addOrderBy('user.rank', 'ASC');

    if (query.country) {
      qb.andWhere('country.name LIKE :country', {
        country: `%${query.country}%`,
      });
    }

    if (query.club) {
      qb.andWhere('club.name LIKE :club', {
        club: `%${query.club}%`,
      });
    }

    if (query.gender) {
      qb.andWhere('user.gender = :gender', {
        gender: query.gender,
      });
    }

    if (query.name) {
      qb.andWhere('user.name LIKE :name', {
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

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  async findById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        'image',
        'country',
        'club',
        'favoriteClubs',
        'personalBests',
        'results',
      ],
    });
    return user;
  }

  async findByCond(cond: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { ...cond },
      relations: ['image', 'club'],
    });

    const clubId = user.club?.id;

    delete user.club;

    return { ...user, clubId };
  }

  async handleFavorites(id: number, club: Club, action: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['favoriteClubs'],
    });

    if (action === 'add') {
      user.favoriteClubs.push(club);
    } else {
      user.favoriteClubs = user.favoriteClubs.filter(
        (favoriteClub) => favoriteClub.id !== club.id,
      );
    }

    return this.repository.save(user);
  }

  async findFavoriteClubs(id: number) {
    const user = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favoriteClubs', 'favoriteClubs')
      .leftJoinAndSelect('favoriteClubs.logo', 'logo')
      .leftJoinAndSelect('favoriteClubs.photo', 'photo')
      .leftJoinAndSelect('favoriteClubs.members', 'members')
      .leftJoinAndSelect('favoriteClubs.teams', 'teams')
      .where('user.id = :id', { id })
      .getOne();

    if (user) {
      return user.favoriteClubs;
    } else {
      return [];
    }
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total users': count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });

    let newCountry: Country;
    if (dto.country) {
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      if (countryIfExist) {
        newCountry = countryIfExist;
      } else {
        newCountry = await this.countryService.create(dto.country);
      }
    }

    user.city = dto.city || user.city;
    user.country = newCountry || user.country;
    user.name = dto.name || user.name;
    user.image = dto.image || user.image;
    user.surname = dto.surname || user.surname;

    return this.repository.save(user);
  }

  async changePassword(
    id: number,
    dto: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    if (dto.newPassword !== dto.confirmPassword || dto.newPassword.length < 6) {
      throw new ForbiddenException('Error Changing password');
    }
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      const isEqual = await bcrypt.compare(dto.oldPassword, user.password);
      if (isEqual) {
        const password = await bcrypt.hash(dto.newPassword, 10);
        return this.updatePassword(id, password);
      }
    }
    return null;
  }

  updatePassword(id: number, password: string) {
    return this.repository.update(id, { password });
  }

  async getUserRank(gender: string, userPoints: number | null) {
    if (!userPoints) {
      return null;
    }
    const rating = await this.repository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'runner' })
      .andWhere('user.totalPoints > 0')
      .andWhere('user.totalPoints < :userPoints', { userPoints })
      .andWhere('user.gender = :gender', { gender })
      .getCount();

    return rating + 1;
  }

  async changeTotalPointsByAddedResult(result: RunnerResult) {
    const user = await this.repository.findOne({
      where: { id: result.runner.id },
      relations: ['results'],
    });

    const resultsLen = user.results.length;

    const pointsToAdd = this.calculatePoints(
      result.distance,
      result.finalResultInMs,
      resultsLen,
    );

    user.totalPoints += pointsToAdd;

    return this.repository.save(user);
  }

  calculatePoints(distance: number, time: number, resultsCount: number) {
    if (distance === 160934) {
      return time / resultsCount;
    } else {
      const toMultiply = 160934 / distance;
      const pointsWithoutExtra = time * toMultiply;
      const extraPoints = pointsWithoutExtra * 0.1;
      const points = pointsWithoutExtra + extraPoints;
      const pointsToAdd = points / resultsCount;
      return pointsToAdd;
    }
  }

  async calculateUsersPoints(gender?: string) {
    let runners = await this.repository.find({
      where: { gender: gender || 'male', role: 'runner' },
      relations: ['results'],
    });

    const runnersWithPoints = runners.map((runner) => {
      const resultsLen = runner.results.length;
      if (resultsLen === 0) {
        return { ...runner, totalPoints: 0 };
      }
      const totalPoints = runner.results.reduce(
        (acc, curr) =>
          this.calculatePoints(
            curr.distance,
            curr.finalResultInMs,
            resultsLen,
          ) + acc,
        0,
      );
      return { ...runner, totalPoints };
    });

    runners = runnersWithPoints;

    return this.repository.save(runners);
  }

  async updateRanking(gender: string) {
    let runners = await this.repository.find({
      where: { role: 'runner', gender: gender || 'male' },
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
      where: { role: 'runner' },
      relations: ['results', 'personalBests'],
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
}
