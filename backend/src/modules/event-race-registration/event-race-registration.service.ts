import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from 'src/modules/users/decorators/user.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateEventRaceRegistrationDto,
  CreateEventRaceTeamRegistrationDto,
} from './dto/create-event-race-registration.entity';
import { EventRaceRegistration } from './entities/event-race-registration.entity';

@Injectable()
export class EventRaceRegistrationService {
  constructor(
    @InjectRepository(EventRaceRegistration)
    private readonly eventRaceRegistrationRepository: Repository<EventRaceRegistration>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTeamRegistration(
    user: AuthenticatedUser,
    dto: CreateEventRaceTeamRegistrationDto,
  ): Promise<EventRaceRegistration> {
    const coach = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['coachTeams'],
    });

    if (!coach.coachTeams.find((team) => team.id === dto.teamId)) {
      throw new UnauthorizedException('User is not a coach of the team');
    }

    // check if team not yet registered

    const teamRegistration = await this.eventRaceRegistrationRepository.findOne(
      {
        where: {
          teamId: dto.teamId,
          eventRaceTypeId: dto.eventRaceTypeId,
        },
      },
    );

    if (teamRegistration) {
      throw new BadRequestException('Team already registered');
    }

    return this.eventRaceRegistrationRepository.save(dto);
  }

  async createIndividualRegistration(
    user: AuthenticatedUser,
    dto: CreateEventRaceRegistrationDto,
  ): Promise<EventRaceRegistration> {
    // check if user not yet registered
    const userRegistration = await this.eventRaceRegistrationRepository.findOne(
      {
        where: {
          runnerId: user.id,
          eventRaceTypeId: dto.eventRaceTypeId,
        },
      },
    );

    if (userRegistration) {
      throw new BadRequestException('User already registered');
    }

    return this.eventRaceRegistrationRepository.save(dto);
  }

  async getUserRegistrations(userId: number): Promise<EventRaceRegistration[]> {
    const registrations = await this.eventRaceRegistrationRepository
      .createQueryBuilder('registration')
      .leftJoinAndSelect('registration.eventRaceType', 'eventRaceType')
      .leftJoinAndSelect('eventRaceType.event', 'event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('location.country', 'country')
      .leftJoinAndSelect('eventRaceType.raceType', 'raceType')
      .where('registration.runnerId = :userId', { userId })
      .leftJoinAndSelect('registration.team', 'team')
      .leftJoinAndSelect('team.coach', 'coach')
      .leftJoinAndSelect('team.teamRunners', 'teamRunners')
      .orWhere('teamRunners.runnerId = :userId', { userId })
      .getMany();

    return registrations;
  }
}
