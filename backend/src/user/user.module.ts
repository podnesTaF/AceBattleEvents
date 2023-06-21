import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from 'src/club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Club])],
  controllers: [UserController],
  providers: [UserService, ClubService],
  exports: [UserService],
})
export class UserModule {}
