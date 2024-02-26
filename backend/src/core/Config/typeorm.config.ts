import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as evnconfig } from 'dotenv';
import { Article } from 'src/modules/article/entities/article.entity';
import { BestResult } from 'src/modules/best-results/entities/best-result.entity';
import { Distance } from 'src/modules/best-results/entities/distance.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Content } from 'src/modules/content/entities/content.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { Document } from 'src/modules/document/entities/document.entity.dto';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { EventRaceType } from 'src/modules/event-race-type/entities/event-race-type.entity';
import { RaceType } from 'src/modules/event-race-type/entities/race-type.entity';
import { RegistrationFee } from 'src/modules/event-race-type/entities/registration-fee.entity';
import { EventType } from 'src/modules/event/entities/event-type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { Hashtag } from 'src/modules/hashtag/entities/hashtag.entity';
import { JoinRequest } from 'src/modules/join-request/entities/join-request.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { OneTimeToken } from 'src/modules/ott/entities/ott.entity';
import { PaymentPurpose } from 'src/modules/payment/entities/payment-purpose.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Penalty } from 'src/modules/penalty/entities/penalty.entity';
import { PushToken } from 'src/modules/push-token/entities/push-token.entity';
import { RaceRunner } from 'src/modules/race-runner/entities/race-runner.entity';
import { RunnerRole } from 'src/modules/race-runner/entities/runner-role.entity';
import { RunnerStatus } from 'src/modules/race-runner/entities/runner-status.entity';
import { RaceTeam } from 'src/modules/race-team/entities/race-team.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { ResetUser } from 'src/modules/reset-user/entities/reset-user.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Split } from 'src/modules/split/entities/split.entity';
import { Standard } from 'src/modules/standard/entities/standard.entity';
import { Subscription } from 'src/modules/subscription/enitites/subscription.entity';
import { TeamPlayer } from 'src/modules/team/entities/team-player.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { TimetableRow } from 'src/modules/timetable/entities/timetable-row.entity';
import { Timetable } from 'src/modules/timetable/entities/timetable.entity';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TicketPrice } from 'src/ticket/entities/ticket-price.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { VisitorTicket } from 'src/visitor-ticket/entities/visitor-ticket.entity';

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
    JoinRequest,
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
    Ticket,
    TicketPrice,
    VisitorTicket,
    OneTimeToken,
  ],
  synchronize: true,
};

export default config;
