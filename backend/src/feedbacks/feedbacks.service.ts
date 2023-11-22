import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private repository: Repository<Feedback>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(dto: CreateFeedbackDto, userId: number) {
    const commentator = await this.userRepository.findOne({
      where: { id: userId },
    });

    return this.repository.save({ ...dto, user: commentator });
  }

  async findAll(queries: { page?: number; limit?: number }) {
    const page = +queries?.page || 1;
    const limit = +queries?.limit || 5;

    const count = await this.repository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user')
      .getCount();

    const totalPages = Math.ceil(count / limit);

    const feedbacks = await this.repository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      feedbacks,
      totalPages,
    };
  }

  async findAllApproved(queries: {
    page?: number;
    limit?: number;
    type: string;
  }) {
    const page = +queries?.page || 1;
    const limit = +queries?.limit || 5;

    const count = await this.repository
      .createQueryBuilder('feedback')
      .where('feedback.approved = :approved', { approved: true })
      .leftJoinAndSelect('feedback.user', 'user')
      .andWhere('user.role = :type', { type: queries.type })
      .getCount();

    const totalPages = Math.ceil(count / limit);

    const feedbacks = await this.repository
      .createQueryBuilder('feedback')
      .where('feedback.approved = :approved', { approved: true })
      .leftJoinAndSelect('feedback.user', 'user')
      .andWhere('user.role = :type', { type: queries.type })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      feedbacks,
      totalPages,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return this.repository.update({ id }, updateFeedbackDto);
  }

  approve(id: number) {
    return this.repository.update({ id }, { approved: true });
  }

  disapprove(id: number) {
    return this.repository.update({ id }, { approved: false });
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}