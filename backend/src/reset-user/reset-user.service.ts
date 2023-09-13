import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ResetUser } from './entities/reset-user.entity';

@Injectable()
export class ResetUserService {
  constructor(
    @InjectRepository(ResetUser)
    private repository: Repository<ResetUser>,
  ) {}

  create(dto: { user: User; token: string }) {
    const expires = new Date().getTime() + 1000 * 60 * 60 * 24;
    return this.repository.save({
      ...dto,
      expires: new Date(expires),
      user: dto.user,
    });
  }

  async checkToken(token: string) {
    const reset = await this.repository.findOne({
      where: { token },
    });

    if (!reset) {
      return false;
    }

    const now = new Date().getTime();

    if (now > reset.expires.getTime()) {
      return false;
    }

    return true;
  }

  async getResetUser(token: string) {
    const reset = await this.repository.findOne({
      where: { token },
      relations: ['user'],
    });

    return reset.user;
  }

  findByCond(cond: any) {
    return this.repository.findOne({ where: { ...cond } });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
