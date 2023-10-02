import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Split } from 'src/splits/entities/splits.entity';
import { SplitsService } from 'src/splits/splits.service';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { RunnerService } from 'src/users/services/runner.service';
import { RunnerResult } from './entities/runner-results.entity';
import { RunnerResultsController } from './runner-results.controller';
import { RunnerResultsService } from './runner-results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RunnerResult,
      TeamResult,
      Runner,
      Split,
      Country,
    ]),
  ],
  controllers: [RunnerResultsController],
  providers: [
    RunnerResultsService,
    SplitsService,
    RunnerService,
    CountryService,
  ],
  exports: [RunnerResultsService],
})
export class RunnerResultsModule {}
