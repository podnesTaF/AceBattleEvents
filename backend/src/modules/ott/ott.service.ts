import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { OneTimeToken } from './entities/ott.entity';

@Injectable()
export class OneTimeTokenService {
  constructor(
    @InjectRepository(OneTimeToken)
    private readonly ottRepository: Repository<OneTimeToken>,
  ) {}

  async createToken(user: User, jwtToken: string): Promise<string> {
    const ott = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60000); // Token expires in 5 minutes

    const tokenEntity = this.ottRepository.create({
      ott,
      jwtToken,
      user,
      expiresAt,
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
}
