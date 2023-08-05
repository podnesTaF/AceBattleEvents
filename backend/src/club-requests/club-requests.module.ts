import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { User } from 'src/user/entities/user.entity';
import { ClubRequestsController } from './club-requests.controller';
import { ClubRequestsService } from './club-requests.service';
import { JoinRequest } from './entities/club-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JoinRequest, User, Club])],
  controllers: [ClubRequestsController],
  providers: [ClubRequestsService],
  exports: [ClubRequestsService],
})
export class ClubRequestsModule {}
