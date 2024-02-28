import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { LessThan, Repository } from 'typeorm';
import { AuthenticatedUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { OneTimeToken } from './entities/ott.entity';

@Injectable()
export class OneTimeTokenService {
  constructor(
    @InjectRepository(OneTimeToken)
    private readonly ottRepository: Repository<OneTimeToken>,
  ) {}

  async createToken(
    user: User | AuthenticatedUser,
    jwtToken: string,
    expiresInMinutes = 5,
    goal = 'auth',
  ): Promise<string> {
    const ott = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60000); // Token expires in 5 minutes

    const tokenEntity = this.ottRepository.create({
      ott,
      jwtToken,
      userId: user.id,
      expiresAt,
      goal,
    });

    await this.ottRepository.save(tokenEntity);

    return ott;
  }

  async validateAndRemoveToken(ott: string): Promise<string | null> {
    const tokenEntity = await this.ottRepository.findOne({
      where: { ott },
      relations: ['user'], // Assuming you want to fetch the user as well
    });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      return null; // Token is invalid or expired
    }

    const jwtToken = tokenEntity.jwtToken;

    return jwtToken;
  }

  async getOttInfo(ott: string) {
    const tokenEntity = await this.ottRepository.findOne({
      where: { ott },
    });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      return null; // Token is invalid or expired
    }

    return tokenEntity;
  }

  async getOttByCond(cond: Partial<OneTimeToken>) {
    return this.ottRepository.findOne({ where: cond });
  }

  async removeExpiredUserTokens(userId: number) {
    await this.ottRepository.delete({
      userId: userId,
      expiresAt: LessThan(new Date()),
    });
  }
}
