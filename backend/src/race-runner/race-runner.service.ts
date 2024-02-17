import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRaceRegistration } from 'src/event-race-registration/entities/event-race-registration.entity';
import { Race } from 'src/race/entities/race.entity';
import { Repository } from 'typeorm';
import { CreateRaceParticipantDto } from './dto/create-race-runner.dto';
import { RaceRunner } from './entities/race-runner.entity';

@Injectable()
export class RaceRunnerService {
  constructor(
    @InjectRepository(RaceRunner)
    private readonly raceRunnerRepository: Repository<RaceRunner>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    @InjectRepository(EventRaceRegistration)
    private readonly eventRaceRegistrationRepository: Repository<EventRaceRegistration>,
  ) {}

  async addRaceRunners(
    raceId: number,
    dto: CreateRaceParticipantDto[],
    teamId?: number,
  ): Promise<RaceRunner[]> {
    // check if race exists
    const race = await this.raceRepository.findOne({
      where: {
        id: raceId,
      },
    });

    if (!race) {
      throw new NotFoundException('Race not found');
    }

    // create
    const runners = await Promise.all(
      dto.map(async (runner) => {
        return await this.createRaceRunner({ race, dto: runner, teamId });
      }),
    );

    return this.raceRunnerRepository.save(runners);
  }

  async createRaceRunner({
    race,
    dto,
    teamId,
  }: {
    race: Race;
    teamId?: number;
    dto: CreateRaceParticipantDto;
  }): Promise<RaceRunner> {
    // check if runner or runner's team is registered for the race type
    let runnerEventRegistration: EventRaceRegistration | undefined;

    if (teamId) {
      runnerEventRegistration =
        await this.eventRaceRegistrationRepository.findOne({
          where: {
            teamId,
            eventRaceTypeId: race.eventRaceTypeId,
          },
        });
    } else {
      runnerEventRegistration =
        await this.eventRaceRegistrationRepository.findOne({
          where: {
            runnerId: dto.runnerId,
            eventRaceTypeId: race.eventRaceTypeId,
          },
        });
    }

    if (!runnerEventRegistration) {
      throw new NotFoundException('Runner not registered for this race type');
    }

    return this.raceRunnerRepository.create({
      ...dto,
      raceId: race.id,
    });
  }

  async removeRaceRunner(id: number): Promise<RaceRunner> {
    const raceRunner = await this.raceRunnerRepository.findOne({
      where: {
        id,
      },
    });

    if (!raceRunner) {
      throw new NotFoundException('Runner not found');
    }

    if (raceRunner.confirmed) {
      throw new BadRequestException('Cannot remove a confirmed runner');
    }

    return this.raceRunnerRepository.remove(raceRunner);
  }
}
