import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClubRequestDto } from './dto/create-club-request.dto';
import { UpdateClubRequestDto } from './dto/update-club-request.dto';
import { JoinRequest } from './entities/club-request.entity';

@Injectable()
export class ClubRequestsService {
  constructor(
    @InjectRepository(JoinRequest)
    private joinRequestRepository: Repository<JoinRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(
    createClubRequestDto: CreateClubRequestDto,
    userId: number,
  ): Promise<JoinRequest> {
    const { clubId, motivation } = createClubRequestDto;

    // Find the user and club entities
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const club = await this.clubRepository.findOne({ where: { id: clubId } });

    // Create a new JoinRequest entity
    const joinRequest = new JoinRequest();
    joinRequest.motivation = motivation;
    joinRequest.user = user;
    joinRequest.club = club;

    // Save the JoinRequest entity to the database
    const createdJoinRequest = await this.joinRequestRepository.save(
      joinRequest,
    );

    return createdJoinRequest;
  }

  async getJoinRequestsForClub(clubId: number): Promise<JoinRequest[]> {
    const joinRequests = await this.joinRequestRepository
      .createQueryBuilder('joinRequest')
      .innerJoinAndSelect('joinRequest.user', 'user')
      .leftJoinAndSelect('user.image', 'image')
      .innerJoinAndSelect('joinRequest.club', 'club')
      .where('joinRequest.club = :clubId', { clubId })
      .getMany();

    return joinRequests;
  }

  async acceptJoinRequest(clubId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });

    // Remove the user from the club's join requests
    await this.joinRequestRepository.delete({ user, club });

    // Add the user to the club's members
    club.members.push(user);

    // Save the club
    await this.clubRepository.save(club);

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
