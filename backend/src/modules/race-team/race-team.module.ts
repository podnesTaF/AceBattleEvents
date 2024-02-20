import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceRunner } from 'src/modules/race-runner/entities/race-runner.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { RaceTeam } from './entities/race-team.entity';
import { RaceTeamController } from './race-team.controller';
import { RaceTeamService } from './race-team.service';

@Module({
  imports: [TypeOrmModule.forFeature([RaceTeam, Race, Team, RaceRunner])],
  controllers: [RaceTeamController],
  providers: [RaceTeamService],
})
export class RaceTeamModule {}
