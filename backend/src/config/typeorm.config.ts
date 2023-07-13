import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { Club } from 'src/club/entities/club.entity';
import { Coach } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { Location } from 'src/locations/entities/locations.entity';
import { Media } from 'src/media/entities/media.entity';
import { PersonalBest } from 'src/personal-bests/entities/personal-best.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
evnconfig();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST || 'localhost',
  port: parseInt(process.env.MYSQLPORT, 10) || 3306,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
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
    Media,
  ],
  synchronize: true,
};

export default config;
