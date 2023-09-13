import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import { Club } from 'src/club/entities/club.entity';
import { User } from 'src/user/entities/user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {
    sgMail.setApiKey(process.env.SEND_GRID_API_K);
  }

  async create(
    createClubRequestDto: CreateClubRequestDto,
    userId: number,
  ): Promise<JoinRequest> {
    const { clubId, motivation } = createClubRequestDto;

    // Find the user and club entities
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });
    const manager = club.members.find((member) => member.role === 'manager');
    if (!manager) {
      throw new Error('Manager not found');
    }

    // Create a new JoinRequest entity
    const joinRequest = new JoinRequest();
    joinRequest.motivation = motivation;
    joinRequest.user = user;
    joinRequest.club = club;

    // Save the JoinRequest entity to the database
    const createdJoinRequest = await this.joinRequestRepository.save(
      joinRequest,
    );

    const msg = {
      to: manager.email,
      from: 'it.podnes@gmail.com',
      subject: `${club.name} - Join Request!`,
      html: joinRequestTemplate(club, user, motivation),
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

  async acceptJoinRequest(clubId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    const manager = club.members.find((member) => member.role === 'manager');

    // Remove the user from the club's join requests
    await this.joinRequestRepository.delete({ user, club });

    // Add the user to the club's members
    club.members.push(user);

    // Save the club
    await this.clubRepository.save(club);

    const msg = {
      to: user.email,
      from: 'it.podnes@gmail.com',
      subject: `${club.name} - Join Request Accepted!`,
      html: acceptJoinRequestTemplate(club, manager),
    };

    try {
      const res = await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }

    return { message: `${user.role} ${user.name} added to the club` };
  }

  async declineJoinRequest(clubId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    // Remove the user from the club's join requests
    await this.joinRequestRepository.delete({ user, club });

    return { message: `${user.role} ${user.name} declined to join the club` };
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
