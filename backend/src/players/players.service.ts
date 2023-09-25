import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BestsService } from 'src/bests/bests.service';
import { createDateFromDDMMYYYY } from 'src/utils/date-formater';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    private repository: Repository<PlayerEntity>,
    private pbService: BestsService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    return this.repository.save({
      ...createPlayerDto,
      personalBests: [],
      dateOfBirth: createDateFromDDMMYYYY(createPlayerDto.dateOfBirth),
    });
  }

  async findAll(query: any) {
    const page = +query.page || 1; // Default to page 1 if not provided
    const limit = +query.limit || 5;

    const qb = this.repository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.country', 'country')
      .leftJoinAndSelect('player.image', 'image');

    if (query.country) {
      qb.where('country.name = :country', { country: query.country });
    }

    if (query.name) {
      qb.andWhere('player.name like :name', { name: `%${query.name}%` });
    }

    if (query.gender) {
      qb.andWhere('player.gender = :gender', { gender: query.gender });
    }

    const totalItems = await qb.getCount();

    const totalPages = Math.ceil(totalItems / limit);

    qb.skip((page - 1) * limit).take(limit);

    const players = await qb.getMany();

    return {
      players,
      totalPages,
    };
  }

  update(updatePlayerDto: any) {
    return this.repository.update(updatePlayerDto.id, updatePlayerDto);
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total players': count };
  }
}
