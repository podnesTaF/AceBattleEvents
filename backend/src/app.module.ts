import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { resolve } from "path";
import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BestsModule } from "./bests/bests.module";
import { ClubRequestsModule } from "./club-requests/club-requests.module";
import { ClubModule } from "./club/club.module";
import typeOrmConfig from "./config/typeorm.config";
import { ContentModule } from "./content/content.module";
import { CountryModule } from "./country/country.module";
import { EventsModule } from "./events/events.module";
import { FutureEventsModule } from "./events/future-events.module";
import { FeedbacksModule } from "./feedbacks/feedbacks.module";
import { FileModule } from "./file/file.module";
import { HashtagModule } from "./hashtag/hashtag.module";
import { IntegrationModule } from "./integration/integration.module";
import { LocationsModule } from "./locations/locations.module";
import { MediaModule } from "./media/media.module";
import { MemberModule } from "./member/member.module";
import { NewsModule } from "./news/news.module";
import { NotificationModule } from "./notification/notification.module";
import { PlayersModule } from "./players/players.module";
import { PrizesModule } from "./prizes/prizes.module";
import { PushTokenModule } from "./push-token/push-token.module";
import { RaceRegistrationModule } from "./race-registration/race-registration.module";
import { RaceModule } from "./race/race.module";
import { ResetUserModule } from "./reset-user/reset-user.module";
import { RunnerResultsModule } from "./runner-results/runner-results.module";
import { SplitsModule } from "./splits/splits.module";
import { TeamRaceRunnerModule } from "./team-race-runner/team-race-runner.module";
import { TeamRegistrationModule } from "./team-registration/team-registration.module";
import { TeamResultsModule } from "./team-results/team-results.module";
import { TeamsModule } from "./teams/teams.module";
import { CoachModule } from "./users/modules/coach.module";
import { ManagerModule } from "./users/modules/manager.module";
import { RunnerModule } from "./users/modules/runner.module";
import { SpectatorModule } from "./users/modules/spectator.module";
import { UserModule } from "./users/modules/user.module";
import { VerifyMemberModule } from "./verify-member/verify-member.module";
import { ViewerRegistrationsModule } from "./viewer-registrations/viewer-registrations.module";
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { GenderModule } from './gender/gender.module';
import { CategoryModule } from './category/category.module';
import { BestResultsModule } from './best-results/best-results.module';
import { StandardModule } from './standard/standard.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the ConfigModule to load environment variables
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "static"),
    }),
    UserModule,
    AuthModule,
    EventsModule,
    LocationsModule,
    TeamsModule,
    PlayersModule,
    BestsModule,
    PrizesModule,
    ClubModule,
    CountryModule,
    FileModule,
    MediaModule,
    NewsModule,
    HashtagModule,
    ContentModule,
    IntegrationModule,
    ClubRequestsModule,
    ViewerRegistrationsModule,
    RaceModule,
    TeamResultsModule,
    RunnerResultsModule,
    SplitsModule,
    AdminModule,
    ResetUserModule,
    MemberModule,
    VerifyMemberModule,
    ManagerModule,
    SpectatorModule,
    RunnerModule,
    CoachModule,
    FeedbacksModule,
    FutureEventsModule,
    NotificationModule,
    TeamRegistrationModule,
    RaceRegistrationModule,
    TeamRaceRunnerModule,
    PushTokenModule,
    RoleModule,
    UserRoleModule,
    GenderModule,
    CategoryModule,
    BestResultsModule,
    StandardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
