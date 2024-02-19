import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRaceRegistration } from 'src/event-race-registration/entities/event-race-registration.entity';
import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import { Race } from 'src/race/entities/race.entity';
import { Split } from 'src/split/entities/split.entity';
import { SplitService } from 'src/split/split.service';
import { RaceRunner } from './entities/race-runner.entity';
import { RunnerRole } from './entities/runner-role.entity';
import { RunnerStatus } from './entities/runner-status.entity';
import { RaceRunnerController } from './race-runner.controller';
import { RaceRunnerService } from './race-runner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RaceRunner,
      RunnerRole,
      RunnerStatus,
      EventRaceRegistration,
      Race,
      Split,
      RaceTeam,
    ]),
  ],
  controllers: [RaceRunnerController],
  providers: [RaceRunnerService, SplitService],
})
export class RaceRunnerModule {}
