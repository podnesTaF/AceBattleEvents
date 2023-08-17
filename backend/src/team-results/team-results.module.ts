import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from 'src/race/entities/race.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamResult } from './entities/team-results.entity';
import { TeamResultsController } from './team-results.controller';
import { TeamResultsService } from './team-results.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamResult, Race, Team])],
  controllers: [TeamResultsController],
  providers: [TeamResultsService],
})
export class TeamResultsModule {}
