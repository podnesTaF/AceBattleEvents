import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
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
    return this.repository.findOne({ where: { id }, relations: ['image'] });
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

  async count() {
    const count = await this.repository.count();
    return { 'Total users': count };
  }
}
