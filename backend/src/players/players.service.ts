import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalBestsService } from 'src/personal-bests/personal-bests.service';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerEntity } from './entities/player.entity';

function createDateFromDDMMYYYY(dateString: string) {
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    private repository: Repository<PlayerEntity>,
    private pbService: PersonalBestsService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const pbs = [];

    if (createPlayerDto.personalBests) {
      for (let i = 0; i < createPlayerDto.personalBests.length; i++) {
        const pb = createPlayerDto.personalBests[i];
        const res = await this.pbService.create(pb);
        pbs.push(res);
      }
    }

    return this.repository.save({
      ...createPlayerDto,
      personalBests: pbs,
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
    return `This action returns a #${id} player`;
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total players': count };
  }
}
