import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunnerCoach } from './entity/runner-coach.entity';
import { Answer } from './types';

@Injectable()
export class RunnerCoachService {
  constructor(
    @InjectRepository(RunnerCoach)
    private readonly runnerCoachRepository: Repository<RunnerCoach>,
  ) {}

  async requestRunnerCoach({
    runnerId,
    coachId,
    initiatorId,
    initiatorsRoles,
  }: {
    runnerId: number;
    coachId: number;
    initiatorId: number;
    initiatorsRoles: string[];
  }): Promise<RunnerCoach> {
    // if runner has an active coach, he can't request another one,
    // and coach can't request a runner who has an active coach.
    // if initiator is not a runner or a coach, he can't create this request.

    if (
      !initiatorsRoles.includes('runner') &&
      !initiatorsRoles.includes('coach')
    ) {
      throw new ForbiddenException(
        'You are not allowed to create this request',
      );
    }

    const existingRequest = await this.runnerCoachRepository.findOne({
      where: { runnerId, coachId },
    });

    if (existingRequest) {
      throw new BadRequestException('Request already exists');
    }

    if (initiatorId !== runnerId && initiatorId !== coachId) {
      throw new BadRequestException(
        'You are not allowed to create this request',
      );
    }

    const runnerCoach = new RunnerCoach();
    runnerCoach.runnerId = runnerId;
    runnerCoach.coachId = coachId;
    runnerCoach.initiatorId = initiatorId;

    return this.runnerCoachRepository.save(runnerCoach);
  }

  async answerRunnerCoachRequest({
    runnerCoachId,
    answererId,
    answer,
  }: {
    runnerCoachId: number;
    answererId: number;
    answer: Answer;
  }): Promise<RunnerCoach> {
    // if answerer is not a runner or a coach, he can't answer this request.
    // after user answers the request, the status of the request should be updated to the answer.
    // if the answer is accepted, the request should be marked as active.
    // Other requests will get a status of outdated.

    const runnerCoach = await this.runnerCoachRepository.findOne({
      where: { id: runnerCoachId },
    });

    if (!runnerCoach) {
      throw new NotFoundException('Request not found');
    }

    if (
      runnerCoach.coachId !== answererId &&
      runnerCoach.runnerId !== answererId
    ) {
      throw new Error('You are not allowed to answer this request');
    }

    if (runnerCoach.status !== 'pending') {
      throw new Error('This request has already been answered or outdated');
    }

    runnerCoach.status = answer;

    runnerCoach.active = answer === Answer.Accepted;

    if (runnerCoach.active) {
      await this.runnerCoachRepository.update(
        { runnerId: runnerCoach.runnerId, status: 'pending' },
        { status: 'outdated' },
      );
    }

    return this.runnerCoachRepository.save(runnerCoach);
  }
}
