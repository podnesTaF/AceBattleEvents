import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { RaceTeam } from 'src/modules/race-team/entities/race-team.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { Split } from 'src/modules/split/entities/split.entity';
import { SplitService } from 'src/modules/split/split.service';
import { RaceRunner } from './entities/race-runner.entity';
import { RunnerRole } from './entities/runner-role.entity';
import { RunnerStatus } from './entities/runner-status.entity';
import { RaceRunnerController } from './race-runner.controller';
import { RaceRunnerService } from './race-runner.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
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
  providers: [RaceRunnerService, SplitService, JwtService],
})
export class RaceRunnerModule {}
