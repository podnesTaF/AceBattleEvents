import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { ClubRequestsController } from './club-requests.controller';
import { ClubRequestsService } from './club-requests.service';
import { JoinRequest } from './entities/club-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JoinRequest, Manager, Club, Runner])],
  controllers: [ClubRequestsController],
  providers: [ClubRequestsService],
  exports: [ClubRequestsService],
})
export class ClubRequestsModule {}