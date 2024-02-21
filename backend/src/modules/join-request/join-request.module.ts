import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPlayer } from '../team/entities/team-player.entity';
import { Team } from '../team/entities/team.entity';
import { TeamPlayerService } from '../team/services/team-player.service';
import { User } from '../users/entities/user.entity';
import { JoinRequest } from './entities/join-request.entity';
import { JoinRequestController } from './join-request.controller';
import { JoinRequestService } from './join-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([JoinRequest, User, Team, TeamPlayer])],
  controllers: [JoinRequestController],
  providers: [JoinRequestService, TeamPlayerService],
})
export class JoinRequestModule {}
