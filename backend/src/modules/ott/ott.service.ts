import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import { LessThan, Repository } from 'typeorm';
import { AuthenticatedUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { OneTimeToken } from './entities/ott.entity';
import { getOtpEmailTemplate } from './utils/getOtpEmailTemplate';

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

  async removeToken(ott: string) {
    await this.ottRepository.delete({ ott });
  }

  async removeExpiredUserTokens(userId: number) {
    await this.ottRepository.delete({
      userId: userId,
      expiresAt: LessThan(new Date()),
    });
  }

  // otp token handling

  async sendVerificationEmail(dto: { email: string }) {
    const existing = await this.ottRepository.findOne({
      where: { email: dto.email },
      order: { expiresAt: 'DESC' },
    });

    if (
      existing &&
      new Date().getTime() - existing.createdAt.getTime() + 1000 * 60 * 10 <
        1000 * 60
    ) {
      return { sent: false, message: 'Email already sent' };
    }

    const otp = this.generateOtp();

    await this.ottRepository.save({
      email: dto.email,
      ott: otp,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 10),
    });

    const msg = {
      to: dto.email,
      from: {
        email: 'it.podnes@gmail.com',
        name: 'Ace Battle Mile',
      },
      subject: 'Your OTP | Ace Battle Mile',
      html: getOtpEmailTemplate({
        otp: otp,
      }),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }

    return { sent: true, message: 'Email sent' };
  }

  generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  async completeVerification(dto: { email: string; otp: string }) {
    const isValid = await this.checkToken(dto.otp, dto.email);
    if (!isValid) {
      throw new BadRequestException('Invalid token');
    }

    await this.ottRepository.delete({ ott: dto.otp });
    return true;
  }

  async checkToken(token: string, email?: string) {
    let verification: OneTimeToken | undefined;

    if (email) {
      verification = await this.ottRepository.findOne({
        where: { ott: token, email },
      });
    } else {
      verification = await this.ottRepository.findOne({
        where: { ott: token },
      });
    }

    if (!verification) return false;

    const now = new Date().getTime();

    if (now > verification.expiresAt.getTime()) {
      return false;
    }

    return true;
  }
}
