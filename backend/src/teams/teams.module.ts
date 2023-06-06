import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { CoachEntity } from 'src/coach/entities/coach.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { LocationEntity } from 'src/locations/entities/locations.entity';
import { LocationsService } from 'src/locations/locations.service';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TeamEntity } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamEntity,
      PlayerEntity,
      CoachEntity,
      UserEntity,
      LocationEntity,
      EventEntity,
    ]),
  ],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    PlayersService,
    CoachService,
    UserService,
    EventsService,
    LocationsService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
