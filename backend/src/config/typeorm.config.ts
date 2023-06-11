import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { CoachEntity } from 'src/coach/entities/coach.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { LocationEntity } from 'src/locations/entities/locations.entity';
import { PersonalBestEntity } from 'src/personal-bests/entities/personal-best.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
evnconfig();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    UserEntity,
    EventEntity,
    LocationEntity,
    PlayerEntity,
    TeamEntity,
    CoachEntity,
    PersonalBestEntity,
    PrizeEntity,
    TransactionEntity,
  ],
  synchronize: true,
};

export default config;
