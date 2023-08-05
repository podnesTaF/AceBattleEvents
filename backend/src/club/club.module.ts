import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, User])],
  controllers: [ClubController],
  providers: [ClubService, UserService],
  exports: [ClubService],
})
export class ClubModule {}
