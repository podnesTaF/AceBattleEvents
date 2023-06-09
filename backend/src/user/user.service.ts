import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save({ ...dto });
  }

  findAll() {
    return this.repository.find({
      select: ['id', 'name', 'surname', 'email', 'city', 'country'],
    });
  }

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['image'] });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne({ where: { ...cond } });
  }
}
