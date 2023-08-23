import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from 'src/club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Club, Country])],
  controllers: [UserController],
  providers: [UserService, ClubService, CountryService],
  exports: [UserService],
})
export class UserModule {}
