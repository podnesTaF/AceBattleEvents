import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Best } from 'src/bests/entities/best.entity';
import { ClubService } from 'src/club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { Content } from 'src/content/entities/content.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { VerifyMember } from 'src/verify-member/entities/verify-member.entity';
import { VerifyMemberService } from 'src/verify-member/verify-member.service';
import { UserController } from '../controllers/user.controller';
import { Manager } from '../entities/manager.entity';
import { User } from '../entities/user.entity';
import { ManagerService } from '../services/manager.service';
import { SpectatorService } from '../services/spectator.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Club,
      Country,
      Manager,
      VerifyMember,
      NotificationEntity,
      Content,
      Best,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ClubService,
    CountryService,
    ManagerService,
    SpectatorService,
    VerifyMemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
