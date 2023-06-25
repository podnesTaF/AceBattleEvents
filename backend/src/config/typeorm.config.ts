import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { Club } from 'src/club/entities/club.entity';
import { Coach } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { Location } from 'src/locations/entities/locations.entity';
import { PersonalBest } from 'src/personal-bests/entities/personal-best.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
evnconfig();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Event,
    Club,
    Location,
    Country,
    PlayerEntity,
    Team,
    Coach,
    PersonalBest,
    PrizeEntity,
  ],
  synchronize: true,
};

export default config;
