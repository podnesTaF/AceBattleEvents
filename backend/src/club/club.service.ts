import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
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

  findAll(queries: any) {
    const qb = this.repository
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.members', 'members')
      .leftJoinAndSelect('club.logo', 'logo');

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

    return qb.getMany();
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
      ],
    });

    const finishedRaces = [];
    club?.teams.forEach((t) => {
      finishedRaces.push(...t.races);
    });

    return finishedRaces;
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    return `This action updates a #${id} club`;
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
