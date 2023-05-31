import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { EventEntity } from 'src/events/entities/event.entity';
import { LocationEntity } from 'src/locations/entities/locations.entity';
import { UserEntity } from 'src/user/entities/user.entity';
evnconfig();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, EventEntity, LocationEntity],
  synchronize: true,
};

export default config;
