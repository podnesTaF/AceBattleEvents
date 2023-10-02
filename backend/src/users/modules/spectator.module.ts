import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { SpectatorController } from '../controllers/spectator.controller';
import { Spectator } from '../entities/spectator.entity';
import { User } from '../entities/user.entity';
import { SpectatorService } from '../services/spectator.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spectator, User, Country])],
  controllers: [SpectatorController],
  providers: [SpectatorService, UserService, CountryService],
  exports: [UserService],
})
export class SpectatorModule {}
