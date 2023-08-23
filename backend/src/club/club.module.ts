import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, User, Country])],
  controllers: [ClubController],
  providers: [ClubService, UserService, CountryService],
  exports: [ClubService],
})
export class ClubModule {}
