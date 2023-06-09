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

    for (let i = 0; i < createPlayerDto.personalBests.length; i++) {
      const pb = createPlayerDto.personalBests[i];
      const res = await this.pbService.create(pb);
      pbs.push(res);
    }

    return this.repository.save({
      ...createPlayerDto,
      personalBests: pbs,
      dateOfBirth: createDateFromDDMMYYYY(createPlayerDto.dateOfBirth),
    });
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }
}
