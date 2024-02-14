import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { BestResult } from 'src/best-results/entities/best-result.entity';
import { Distance } from 'src/best-results/entities/distance.entity';
import { Category } from 'src/category/entities/category.entity';
import { Content } from 'src/content/entities/content.entity';
import { Country } from 'src/country/entity/country.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { Media } from 'src/media/entities/media.entity';
import { News } from 'src/news/entities/news.entity';
import { PushToken } from 'src/push-token/entities/push-token.entity';
import { ResetUser } from 'src/reset-user/entities/reset-user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RunnerCoach } from 'src/runner-coach/entity/runner-coach.entity';
import { Standard } from 'src/standard/entities/standard.entity';
import { Subscription } from 'src/subscription/enitites/subscription.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { User } from 'src/users/entities/user.entity';
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
    Country,
    Media,
    Hashtag,
    Content,
    News,
    ResetUser,
    PushToken,
    Role,
    UserRole,
    Gender,
    Category,
    Distance,
    BestResult,
    Standard,
    Subscription,
    RunnerCoach,
  ],
  synchronize: true,
};

export default config;
