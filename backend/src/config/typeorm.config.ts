import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as evnconfig } from "dotenv";
import { Admin } from "src/admin/entities/admin.entity";
import { Best } from "src/bests/entities/best.entity";
import { JoinRequest } from "src/club-requests/entities/club-request.entity";
import { Club } from "src/club/entities/club.entity";
import { Content } from "src/content/entities/content.entity";
import { Country } from "src/country/entity/country.entity";
import { Event } from "src/events/entities/event.entity";
import { FutureEvent } from "src/events/entities/future-event.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Hashtag } from "src/hashtag/entities/hashtag.entity";
import { Location } from "src/locations/entities/locations.entity";
import { Media } from "src/media/entities/media.entity";
import { Member } from "src/member/entities/member.entity";
import { News } from "src/news/entities/news.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { PlayerEntity } from "src/players/entities/player.entity";
import { PrizeEntity } from "src/prizes/entities/prize.entity";
import { Race } from "src/race/entities/race.entity";
import { ResetUser } from "src/reset-user/entities/reset-user.entity";
import { RunnerResult } from "src/runner-results/entities/runner-results.entity";
import { Split } from "src/splits/entities/splits.entity";
import { TeamRegistration } from "src/team-registration/entities/team-registration.entity";
import { TeamResult } from "src/team-results/entities/team-results.entity";
import { Team } from "src/teams/entities/team.entity";
import { Coach } from "src/users/entities/coach.entity";
import { Manager } from "src/users/entities/manager.entity";
import { Runner } from "src/users/entities/runner.entity";
import { Spectator } from "src/users/entities/spectator.entity";
import { User } from "src/users/entities/user.entity";
import { VerifyMember } from "src/verify-member/entities/verify-member.entity";
import { ViewerRegistration } from "src/viewer-registrations/entities/viewer-registration.entity";
evnconfig();

const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.MYSQLHOST || "localhost",
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
    Best,
    PrizeEntity,
    Media,
    ViewerRegistration,
    JoinRequest,
    Hashtag,
    Content,
    News,
    Race,
    TeamResult,
    Admin,
    RunnerResult,
    Split,
    ResetUser,
    Member,
    VerifyMember,
    Manager,
    Runner,
    Spectator,
    Feedback,
    FutureEvent,
    TeamRegistration,
    NotificationEntity,
  ],
  synchronize: true,
};

export default config;
