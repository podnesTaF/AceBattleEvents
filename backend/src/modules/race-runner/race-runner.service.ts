import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as QRCode from 'qrcode';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { RaceTeam } from 'src/modules/race-team/entities/race-team.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import {
  CreateRaceRunnerSplitDto,
  CreateSplitDto,
} from 'src/modules/split/dto/create-split.dto';
import { SplitService } from 'src/modules/split/split.service';
import { Repository } from 'typeorm';
import { AuthenticatedUser } from '../users/decorators/user.decorator';
import { CreateRaceParticipantDto } from './dto/create-race-runner.dto';
import { CreateRunnerRoleDto } from './dto/create-runner-role.dto';
import { CreateRunnerStatusDto } from './dto/create-runner-status.dto';
import { RaceRunner } from './entities/race-runner.entity';
import { RunnerRole } from './entities/runner-role.entity';
import { RunnerStatus } from './entities/runner-status.entity';

@Injectable()
export class RaceRunnerService {
  constructor(
    @InjectRepository(RaceRunner)
    private readonly raceRunnerRepository: Repository<RaceRunner>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    @InjectRepository(EventRaceRegistration)
    private readonly eventRaceRegistrationRepository: Repository<EventRaceRegistration>,
    @InjectRepository(RunnerStatus)
    private readonly runnerStatusRepository: Repository<RunnerStatus>,
    @InjectRepository(RaceTeam)
    private readonly raceTeamRepository: Repository<RaceTeam>,
    @InjectRepository(RunnerRole)
    private readonly runnerRoleRepository: Repository<RunnerRole>,
    private readonly splitService: SplitService,
    private jwtService: JwtService,
  ) {}

  async addRaceRunners(
    raceId: number,
    dto: CreateRaceParticipantDto[],
    raceTeamId?: number,
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

    let raceTeam: RaceTeam | undefined;

    if (raceTeamId) {
      raceTeam = await this.raceTeamRepository.findOne({
        where: { id: raceTeamId },
      });
    }

    // create
    const runners = await Promise.all(
      dto.map(async (runner) => {
        return await this.createRaceRunner({ race, dto: runner, raceTeam });
      }),
    );

    return this.raceRunnerRepository.save(runners);
  }

  async generateRunnerJWT({
    eventEndTime,
    type,
    raceRunnerId,
  }: {
    eventEndTime: Date;
    type: string;
    raceRunnerId: number;
  }): Promise<string> {
    try {
      const payload = { raceRunnerId, type };
      const expiresIn = eventEndTime.getTime() - Date.now();
      return this.jwtService.sign(payload, {
        expiresIn: Math.floor(expiresIn / 1000), // Expiration in seconds
      });
    } catch (e) {
      throw new BadRequestException('Error generating token');
    }
  }

  async generateQRCodeForRunner(jwt: string): Promise<string> {
    return await QRCode.toDataURL(jwt);
  }

  async createRaceRunner({
    race,
    dto,
    raceTeam,
  }: {
    race: Race;
    raceTeam?: RaceTeam;
    dto: CreateRaceParticipantDto;
  }): Promise<RaceRunner> {
    // check if runner or runner's team is registered for the race type
    let runnerEventRegistration: EventRaceRegistration | undefined;

    if (raceTeam) {
      runnerEventRegistration =
        await this.eventRaceRegistrationRepository.findOne({
          where: {
            teamId: raceTeam.teamId,
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

    if (raceTeam) {
      return this.raceRunnerRepository.create({
        ...dto,
        raceTeamId: raceTeam.id,
      });
    }

    return this.raceRunnerRepository.create({
      ...dto,
      raceId: race.id,
    });
  }

  // get qrcode for racerunner
  async getQrCodeForRaceRunner(
    user: AuthenticatedUser,
    raceRunnerId: number,
  ): Promise<string> {
    const raceRunner = await this.raceRunnerRepository.findOne({
      where: { id: raceRunnerId },
      relations: ['race', 'raceTeam.race'],
    });

    if (!raceRunner) {
      throw new NotFoundException('Runner for the race is not found');
    }
    if (raceRunner.runnerId !== user.id) {
      throw new UnauthorizedException('You cannot request this qr code');
    }

    const token = await this.generateRunnerJWT({
      raceRunnerId: raceRunnerId,
      type: raceRunner.raceTeamId ? 'team' : 'race',
      eventEndTime:
        raceRunner.race?.startTime || raceRunner.raceTeam?.race?.startTime,
    });

    return this.generateQRCodeForRunner(token);
  }

  // finish race runner

  async finishRaceRunner(
    id: number,
    dto: CreateRaceRunnerSplitDto[],
  ): Promise<RaceRunner> {
    const raceRunner = await this.raceRunnerRepository.findOne({
      where: {
        id,
        status: { name: 'confirmed' },
      },
    });

    if (!raceRunner) {
      throw new NotFoundException('Confirmed Race Runner not found');
    }

    const splits = await this.splitService.createManySplits(
      dto.map((s) => ({ ...s, raceRunnerId: id } as CreateSplitDto)),
    );

    raceRunner.splits = splits;
    raceRunner.status = await this.runnerStatusRepository.findOne({
      where: { name: 'finished' },
    });

    return this.raceRunnerRepository.save(raceRunner);
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

  // reading and verifing qrcode info
  async readQrcode(
    token: string,
  ): Promise<
    RaceRunner & { isAllowedToConfirm: boolean; type: 'race' | 'team' }
  > {
    const {
      raceRunnerId,
      type,
    }: { raceRunnerId: number; type: 'race' | 'team' } =
      await this.jwtService.verify(token);

    const raceRunner = await this.raceRunnerRepository.findOne({
      where: { id: raceRunnerId },
      relations: ['runner.team', 'runner.gender', 'raceTeam', 'status'],
    });

    if (!raceRunner) {
      throw new BadRequestException(
        'Race Runner not found. Please update the qrcode.',
      );
    }

    // runner is not allowed to confirm, if he already confirmed.
    const isAllowedToConfirm: boolean = raceRunner.confirmed;

    return { ...raceRunner, isAllowedToConfirm, type };
  }

  async confirmParticipation(
    raceRunnerId: number,
  ): Promise<{ startNumber: string; race: Race }> {
    const raceRunner = await this.raceRunnerRepository.findOne({
      where: { id: raceRunnerId },
      relations: ['race', 'teamRace.race'],
    });

    if (!raceRunner || raceRunner.confirmed) {
      throw new BadRequestException('Runner not found or already confirmed');
    }

    raceRunner.confirmed = true;
    const status = await this.runnerStatusRepository.findOne({
      where: { name: 'ready' },
    });
    raceRunner.status = status;

    await this.raceRunnerRepository.save(raceRunner);
    return {
      startNumber: raceRunner.startNumber,
      race: raceRunner.race || raceRunner.raceTeam?.race,
    };
  }

  // create runner role
  async createRunnerRole(dto: CreateRunnerRoleDto): Promise<RunnerRole> {
    return this.runnerRoleRepository.save(dto);
  }

  // create runner status
  async createRunnerStatus(dto: CreateRunnerStatusDto): Promise<RunnerStatus> {
    return this.runnerStatusRepository.save(dto);
  }
}
