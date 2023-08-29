import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(createClubDto: CreateClubDto, managerId: number) {
    const manager = await this.userService.findById(managerId);
    return this.repository.save({
      ...createClubDto,
      members: [manager],
      logo: createClubDto.logo || null,
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
      .orderBy('club.id', 'DESC');

    const conditions = [];

    if (queries.name) {
      conditions.push('club.name LIKE :name');
    }

    if (queries.country) {
      conditions.push('club.country LIKE :country');
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

  async findOne(id: number) {
    const club = await this.repository.findOne({
      where: { id },
      relations: ['members', 'photo', 'logo', 'members.country'],
    });

    return club;
  }

  async findPure(id: number) {
    const club = await this.repository.findOne({
      where: { id },
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

    club.name = dto.name || club.name;
    club.city = dto.city || club.city;
    club.country = dto.country || club.country;

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
