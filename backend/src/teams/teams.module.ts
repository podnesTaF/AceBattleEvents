import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestsService } from 'src/bests/bests.service';
import { Best } from 'src/bests/entities/best.entity';
import { ClubService } from 'src/club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { CoachService } from 'src/coach/coach.service';
import { Coach } from 'src/coach/entities/coach.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { FileService } from 'src/file/file.service';
import { Location } from 'src/locations/entities/locations.entity';
import { LocationsService } from 'src/locations/locations.service';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { PrizesService } from 'src/prizes/prizes.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Team } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      PlayerEntity,
      Coach,
      User,
      Location,
      Event,
      Country,
      PrizeEntity,
      Best,
      Media,
      Club,
    ]),
  ],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    PlayersService,
    CoachService,
    UserService,
    EventsService,
    PrizesService,
    LocationsService,
    CountryService,
    FileService,
    BestsService,
    MediaService,
    ClubService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
