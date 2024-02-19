import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { Article } from 'src/article/entities/article.entity';
import { BestResult } from 'src/best-results/entities/best-result.entity';
import { Distance } from 'src/best-results/entities/distance.entity';
import { Category } from 'src/category/entities/category.entity';
import { Content } from 'src/content/entities/content.entity';
import { Country } from 'src/country/entity/country.entity';
import { Document } from 'src/document/entities/document.entity.dto';
import { EventRaceRegistration } from 'src/event-race-registration/entities/event-race-registration.entity';
import { EventRaceType } from 'src/event-race-type/entities/event-race-type.entity';
import { RaceType } from 'src/event-race-type/entities/race-type.entity';
import { RegistrationFee } from 'src/event-race-type/entities/registration-fee.entity';
import { EventType } from 'src/event/entities/event-type.entity';
import { Event } from 'src/event/entities/event.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { Location } from 'src/location/entities/location.entity';
import { Media } from 'src/media/entities/media.entity';
import { PaymentPurpose } from 'src/payment/entities/payment-purpose.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Penalty } from 'src/penalty/entities/penalty.entity';
import { PushToken } from 'src/push-token/entities/push-token.entity';
import { RaceRunner } from 'src/race-runner/entities/race-runner.entity';
import { RunnerRole } from 'src/race-runner/entities/runner-role.entity';
import { RunnerStatus } from 'src/race-runner/entities/runner-status.entity';
import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import { Race } from 'src/race/entities/race.entity';
import { ResetUser } from 'src/reset-user/entities/reset-user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RunnerCoach } from 'src/runner-coach/entity/runner-coach.entity';
import { Split } from 'src/split/entities/split.entity';
import { Standard } from 'src/standard/entities/standard.entity';
import { Subscription } from 'src/subscription/enitites/subscription.entity';
import { TeamPlayer } from 'src/team/entities/team-player.entity';
import { Team } from 'src/team/entities/team.entity';
import { TimetableRow } from 'src/timetable/entities/timetable-row.entity';
import { Timetable } from 'src/timetable/entities/timetable.entity';
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
    Article,
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
    Team,
    TeamPlayer,
    Location,
    Document,
    Timetable,
    TimetableRow,
    RaceType,
    EventRaceType,
    Event,
    EventType,
    Payment,
    PaymentPurpose,
    EventRaceRegistration,
    RegistrationFee,
    RaceTeam,
    RaceRunner,
    RunnerRole,
    RunnerStatus,
    Race,
    Penalty,
    Split,
  ],
  synchronize: true,
};

export default config;
