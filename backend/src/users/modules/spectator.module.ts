import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { SpectatorController } from '../controllers/spectator.controller';
import { Spectator } from '../entities/spectator.entity';
import { SpectatorService } from '../services/spectator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spectator, Country])],
  controllers: [SpectatorController],
  providers: [SpectatorService, CountryService],
  exports: [SpectatorService],
})
export class SpectatorModule {}
