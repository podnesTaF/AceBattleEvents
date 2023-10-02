import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from 'src/club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { UserController } from '../controllers/user.controller';
import { Manager } from '../entities/manager.entity';
import { Spectator } from '../entities/spectator.entity';
import { User } from '../entities/user.entity';
import { ManagerService } from '../services/manager.service';
import { SpectatorService } from '../services/spectator.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Club, Country, Manager, Spectator]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ClubService,
    CountryService,
    ManagerService,
    SpectatorService,
  ],
  exports: [UserService],
})
export class UserModule {}
