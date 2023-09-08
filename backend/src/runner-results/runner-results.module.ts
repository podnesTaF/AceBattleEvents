import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Split } from 'src/splits/entities/splits.entity';
import { SplitsService } from 'src/splits/splits.service';
import { TeamResult } from 'src/team-results/entities/team-results.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RunnerResult } from './entities/runner-results.entity';
import { RunnerResultsController } from './runner-results.controller';
import { RunnerResultsService } from './runner-results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RunnerResult, TeamResult, User, Split, Country]),
  ],
  controllers: [RunnerResultsController],
  providers: [RunnerResultsService, SplitsService, UserService, CountryService],
})
export class RunnerResultsModule {}
