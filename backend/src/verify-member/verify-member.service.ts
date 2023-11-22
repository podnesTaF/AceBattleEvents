import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVerifyMemberDto } from './dto/create-verify-member.dto';
import { UpdateVerifyMemberDto } from './dto/update-verify-member.dto';
import { VerifyMember } from './entities/verify-member.entity';

@Injectable()
export class VerifyMemberService {
  constructor(
    @InjectRepository(VerifyMember)
    private repository: Repository<VerifyMember>,
  ) {}

  create(dto: CreateVerifyMemberDto) {
    const expires = new Date().getTime() + 1000 * 60 * 60 * 24;

    return this.repository.save({
      ...dto,
      expires: new Date(expires),
      member: dto.member,
      user: dto.user,
    });
  }

  async checkToken(token: string) {
    const verification = await this.repository.findOne({
      where: { token },
    });

    if (!verification) return false;

    const now = new Date().getTime();

    if (now > verification.expires.getTime()) {
      return false;
    }

    return true;
  }

  async getMember(token: string) {
    const verification = await this.repository.findOne({
      where: { token },
      relations: ['member'],
    });

    if (!verification) return null;

    return verification.member;
  }

  async getUser(token: string) {
    const verification = await this.repository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!verification) return null;

    return verification.user;
  }

  async delete(token: string) {
    return this.repository.delete({ token });
  }

  findAll() {
    return `This action returns all verifyMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verifyMember`;
  }

  update(id: number, updateVerifyMemberDto: UpdateVerifyMemberDto) {
    return `This action updates a #${id} verifyMember`;
  }
}