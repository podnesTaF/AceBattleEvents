import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, Repository } from 'typeorm';
import { Team } from '../team/entities/team.entity';
import { TeamPlayerService } from '../team/services/team-player.service';
import { AuthenticatedUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { AnswerJoinRequestDto } from './dto/answer-join-request.dto';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';
import { JoinRequest } from './entities/join-request.entity';

@Injectable()
export class JoinRequestService {
  constructor(
    @InjectRepository(JoinRequest)
    private readonly joinRequestRepository: Repository<JoinRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly teamPlayerService: TeamPlayerService,
  ) {}

  async createJoinRequest(
    initiator: AuthenticatedUser,
    dto: CreateJoinRequestDto,
  ): Promise<JoinRequest> {
    const isDuplicate = await this.joinRequestRepository.findOne({
      where: [
        { teamId: dto.teamId, runnerId: dto.runnerId, status: 'pending' },
      ],
    });

    if (isDuplicate) {
      throw new ForbiddenException('Join request already exists');
    }

    const runner = await this.userRepository.findOne({
      where: { id: dto.runnerId },
      relations: ['runnerTeams'],
    });

    if (!runner) {
      throw new ForbiddenException('Runner not found');
    }

    // Check if the runner is already in the team
    if (
      runner.runnerTeams.find(
        (teamPlayer) => teamPlayer.teamId === dto.teamId && teamPlayer.active,
      )
    ) {
      throw new ForbiddenException('Runner is already in the team');
    }

    const team = await this.teamRepository.findOne({
      where: { id: dto.teamId },
    });

    // Check if the initiator is the coach of the team or the runner
    if (team.coachId !== initiator.id && dto.runnerId !== initiator.id) {
      throw new ForbiddenException(
        'You are not allowed to create a join request for this team',
      );
    }

    // check if the team is open to join
    if (!team.joinRequestOpen) {
      throw new BadRequestException('The team is not open to join');
    }

    const joinRequest = this.joinRequestRepository.create({
      message: dto.message,
      teamId: dto.teamId,
      runnerId: dto.runnerId,
      initiatorId: initiator.id,
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
    return this.joinRequestRepository.save(joinRequest);
  }

  async answerJoinRequest(
    user: AuthenticatedUser,
    id: number,
    dto: AnswerJoinRequestDto,
  ): Promise<JoinRequest> {
    const joinRequest = await this.joinRequestRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!joinRequest) {
      throw new ForbiddenException('Join request not found');
    }

    if (
      joinRequest.team.coachId !== user.id &&
      joinRequest.runnerId !== user.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to answer this request',
      );
    }

    if (joinRequest.status !== 'pending') {
      throw new BadRequestException('The join request is already answered');
    }

    joinRequest.status = dto.status;
    joinRequest.statusChangedAt = new Date();

    if (dto.status === 'accepted') {
      await this.teamPlayerService.createTeamPlayer({
        runnerId: joinRequest.runnerId,
        teamId: joinRequest.teamId,
      });
    }

    return this.joinRequestRepository.save(joinRequest);
  }

  async deactivateExpiredRequests(): Promise<void> {
    const expiredRequests = await this.joinRequestRepository.find({
      where: { expiresAt: LessThan(new Date()), status: 'pending' },
    });

    expiredRequests.forEach(async (request) => {
      request.status = 'expired';
      request.statusChangedAt = new Date();
      await this.joinRequestRepository.save(request);
    });
  }

  async deleteJoinRequest(
    user: AuthenticatedUser,
    id: number,
  ): Promise<DeleteResult> {
    if (user.roles.some((role) => role.name === 'admin')) {
      return await this.joinRequestRepository.delete(id);
    }

    const joinRequest = await this.joinRequestRepository.findOne({
      where: { id, status: 'pending' },
    });

    if (!joinRequest || joinRequest.initiatorId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this join request',
      );
    }

    return await this.joinRequestRepository.delete(id);
  }
}
