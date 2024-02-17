import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceTeam } from './entities/race-team.entity';
import { RaceTeamController } from './race-team.controller';
import { RaceTeamService } from './race-team.service';

@Module({
  imports: [TypeOrmModule.forFeature([RaceTeam])],
  controllers: [RaceTeamController],
  providers: [RaceTeamService],
})
export class RaceTeamModule {}
