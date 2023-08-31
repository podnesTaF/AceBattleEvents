import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Club } from 'src/club/entities/club.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
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
      });

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

    return { athletes, totalPages };
  }

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['image', 'country', 'club', 'favoriteClubs'],
    });
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
}
