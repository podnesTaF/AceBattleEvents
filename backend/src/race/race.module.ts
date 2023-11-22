import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Race } from './entities/race.entity';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Race, Event, Team])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}