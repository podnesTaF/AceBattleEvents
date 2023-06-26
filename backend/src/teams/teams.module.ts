import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { Coach } from 'src/coach/entities/coach.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { FileService } from 'src/file/file.service';
import { Location } from 'src/locations/entities/locations.entity';
import { LocationsService } from 'src/locations/locations.service';
import { PersonalBest } from 'src/personal-bests/entities/personal-best.entity';
import { PersonalBestsService } from 'src/personal-bests/personal-bests.service';
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
      PersonalBest,
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
    PersonalBestsService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
