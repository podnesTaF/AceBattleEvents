import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { Repository } from 'typeorm';
import { Spectator } from '../entities/spectator.entity';

@Injectable()
export class SpectatorService {
  constructor(
    @InjectRepository(Spectator)
    private repository: Repository<Spectator>,
  ) {}

  async findFavoriteClubs(id: number) {
    const user = await this.repository
      .createQueryBuilder('spectator')
      .leftJoinAndSelect('spectator.favoriteClubs', 'favoriteClubs')
      .leftJoinAndSelect('favoriteClubs.logo', 'logo')
      .leftJoinAndSelect('favoriteClubs.photo', 'photo')
      .leftJoinAndSelect('favoriteClubs.members', 'members')
      .leftJoinAndSelect('favoriteClubs.teams', 'teams')
      .where('spectator.id = :id', { id })
      .getOne();

    if (user) {
      return user.favoriteClubs;
    } else {
      return [];
    }
  }

  async handleFavorites(id: number, club: Club, action: string) {
    const spectator = await this.repository.findOne({
      where: { id },
      relations: ['favoriteClubs'],
    });

    if (action === 'add') {
      spectator.favoriteClubs.push(club);
    } else {
      spectator.favoriteClubs = spectator.favoriteClubs.filter(
        (favoriteClub) => favoriteClub.id !== club.id,
      );
    }

    return this.repository.save(spectator);
  }
}
