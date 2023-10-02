import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Spectator } from 'src/users/entities/spectator.entity';
import { User } from 'src/users/entities/user.entity';
import { ManagerService } from 'src/users/services/manager.service';
import { SpectatorService } from 'src/users/services/spectator.service';
import { UserService } from 'src/users/services/user.service';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Club, User, Country, Spectator, Manager]),
  ],
  controllers: [ClubController],
  providers: [
    ClubService,
    UserService,
    CountryService,
    SpectatorService,
    ManagerService,
  ],
  exports: [ClubService],
})
export class ClubModule {}
