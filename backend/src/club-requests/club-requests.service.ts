import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import { Club } from 'src/club/entities/club.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { Repository } from 'typeorm';
import { CreateClubRequestDto } from './dto/create-club-request.dto';
import { UpdateClubRequestDto } from './dto/update-club-request.dto';
import { JoinRequest } from './entities/club-request.entity';
import {
  acceptJoinRequestTemplate,
  joinRequestTemplate,
} from './utils/getMessageTemplate';

@Injectable()
export class ClubRequestsService {
  constructor(
    @InjectRepository(JoinRequest)
    private joinRequestRepository: Repository<JoinRequest>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(Runner)
    private runnerRepository: Repository<Runner>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async create(
    createClubRequestDto: CreateClubRequestDto,
    runnerId: number,
  ): Promise<JoinRequest> {
    const { clubId, motivation } = createClubRequestDto;

    // Find the user and club entities
    const runner = await this.runnerRepository.findOne({
      where: { id: runnerId },
    });
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['runners', 'manager'],
    });
    const manager = club.manager;
    if (!manager) {
      throw new Error('Manager not found');
    }

    // Create a new JoinRequest entity
    const joinRequest = new JoinRequest();
    joinRequest.motivation = motivation;
    joinRequest.runner = runner;
    joinRequest.club = club;

    // Save the JoinRequest entity to the database
    const createdJoinRequest = await this.joinRequestRepository.save(
      joinRequest,
    );

    const msg = {
      to: manager.user.email,
      from: 'it.podnes@gmail.com',
      subject: `${club.name} - Join Request!`,
      html: joinRequestTemplate(club, runner, motivation),
    };

    try {
      const res = await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }

    return createdJoinRequest;
  }

  async getJoinRequestsForClub(
    clubId: number,
    queries: any,
  ): Promise<{ totalCount: number; joinRequests: JoinRequest[] }> {
    const page = +queries?.page || 1;
    const limit = +queries?.limit || 5;
    const offset = (page - 1) * limit;

    const totalCount = await this.joinRequestRepository
      .createQueryBuilder('joinRequest')
      .where('joinRequest.club = :clubId', { clubId })
      .getCount();

    const pageCount = Math.ceil(totalCount / limit);

    const qb = this.joinRequestRepository
      .createQueryBuilder('joinRequest')
      .innerJoinAndSelect('joinRequest.user', 'user')
      .leftJoinAndSelect('user.image', 'image')
      .innerJoinAndSelect('joinRequest.club', 'club')
      .where('joinRequest.club = :clubId', { clubId });

    if (queries.sortby) {
      if (queries.sortby === 'latest') {
        qb.orderBy('joinRequest.createdAt', 'DESC');
      } else {
        qb.orderBy('joinRequest.createdAt', 'ASC');
      }
    }

    if (queries.name) {
      qb.andWhere('user.name LIKE :name', { name: `%${queries.name}%` });
    }

    const joinRequests = await qb.offset(offset).limit(limit).getMany();
    return {
      totalCount: pageCount,
      joinRequests,
    };
  }

  async acceptJoinRequest(clubId: number, runnerId: number) {
    const runner = await this.runnerRepository.findOne({
      where: { id: runnerId },
    });

    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members', 'manager'],
    });

    const manager = club.manager;

    // Remove the user from the club's join requests
    await this.joinRequestRepository.delete({ runner, club });

    // Add the user to the club's members
    club.runners.push(runner);

    // Save the club
    await this.clubRepository.save(club);

    const msg = {
      to: runner.user.email,
      from: 'it.podnes@gmail.com',
      subject: `${club.name} - Join Request Accepted!`,
      html: acceptJoinRequestTemplate(club, manager),
    };

    try {
      const res = await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }

    return { message: `Runner ${runner.user.name} added to the club` };
  }

  async declineJoinRequest(clubId: number, runnerId: number) {
    const runner = await this.runnerRepository.findOne({
      where: { id: runnerId },
    });

    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    // Remove the user from the club's join requests
    await this.joinRequestRepository.delete({ runner, club });

    return { message: `Runner ${runner.user.name} declined to join the club` };
  }

  findAll() {
    return `This action returns all clubRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clubRequest`;
  }

  update(id: number, updateClubRequestDto: UpdateClubRequestDto) {
    return `This action updates a #${id} clubRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} clubRequest`;
  }
}