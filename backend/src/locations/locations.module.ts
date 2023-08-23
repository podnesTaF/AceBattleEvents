import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Location } from './entities/locations.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Country])],
  controllers: [LocationsController],
  providers: [LocationsService, CountryService],
  exports: [LocationsService],
})
export class LocationsModule {}
