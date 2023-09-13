import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Media } from 'src/media/entities/media.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private repository: Repository<Club>,
    private userService: UserService,
    private countryService: CountryService,
  ) {}

  async create(createClubDto: CreateClubDto, managerId: number) {
    const manager = await this.userService.findById(managerId);

    let country = await this.countryService.returnIfExist({
      name: createClubDto.country,
    });

    if (!country) {
      country = await this.countryService.create(createClubDto.country);
    }

    return this.repository.save({
      name: createClubDto.name,
      city: createClubDto.city,
      members: [manager],
      logo: createClubDto.logo || null,
      country: country,
    });
  }

  async findAll(queries: any) {
    const limit = +queries.limit || 10;
    const page = +queries.page || 1;
    const offset = (page - 1) * limit;
    const totalCount = await this.repository.count();

    const qb = this.repository
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.members', 'members')
      .leftJoinAndSelect('club.teams', 'teams')
      .leftJoinAndSelect('club.logo', 'logo')
      .leftJoinAndSelect('club.country', 'country')
      .orderBy('club.id', 'DESC');

    const conditions = [];

    if (queries.name) {
      conditions.push('club.name LIKE :name');
    }

    if (queries.country) {
      conditions.push('country.name LIKE :country');
    }

    if (conditions.length > 0) {
      qb.where(conditions.join(' AND '), {
        name: `%${queries.name || ''}%`,
        country: `%${queries.country || ''}%`,
      });
    }

    const clubs = await qb.getMany();

    return {
      clubs,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  findAllSnippet() {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }

  findAllPreview() {
    return this.repository.find({
      relations: ['logo'],
      select: ['id', 'name', 'logo'],
    });
  }

  async findOne(id: number) {
    const club = await this.repository.findOne({
      where: { id },
      relations: [
        'members',
        'photo',
        'logo',
        'members.country',
        'country',
        'members.image',
      ],
    });

    return club;
  }

  async findPure(id: number) {
    const club = await this.repository.findOne({
      where: { id },
      relations: ['country'],
    });

    return club;
  }

  async handleFavorite(userId: number, clubId: number, action: string) {
    const club = await this.repository.findOne({ where: { id: clubId } });

    return this.userService.handleFavorites(userId, club, action);
  }

  async findFinishedRacesByClub(clubId: number) {
    const club = await this.repository.findOne({
      where: { id: clubId },
      relations: [
        'teams',
        'teams.races',
        'teams.races.winner',
        'teams.races.teamResults',
        'teams.races.event',
        'teams.races.teamResults.team',
      ],
    });

    const finishedRaces = [];
    club?.teams.forEach((t) => {
      finishedRaces.push(...t.races);
    });

    return finishedRaces;
  }

  async update(
    id: number,
    dto: {
      name?: string;
      city?: string;
      country?: string;
      logo?: Media;
      photo?: Media;
    },
  ) {
    const club = await this.repository.findOne({
      where: { id },
      relations: ['logo', 'photo'],
    });

    let country = await this.countryService.returnIfExist({
      name: dto.country,
    });

    if (!country) {
      country = await this.countryService.create(dto.country);
    }

    club.name = dto.name || club.name;
    club.city = dto.city || club.city;
    club.country = country || club.country;

    if (dto.logo) {
      club.logo = dto.logo;
    }

    if (dto.photo) {
      club.photo = dto.photo;
    }

    return this.repository.save(club);
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
  async leaveClub(userId: number, clubId: number) {
    const club = await this.repository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    club.members = club.members.filter((member) => member.id !== userId);

    return this.repository.save(club);
  }

  async kickMembers(managerId: number, clubId: number, userIds: number[]) {
    const user = await this.userService.findById(managerId);

    if (user?.role !== 'manager') {
      throw new Error('You are not allowed to kick members');
    }

    const club = await this.repository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    club.members = club.members.filter(
      (member) => !userIds.includes(member.id),
    );

    return this.repository.save(club);
  }
}
