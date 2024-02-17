import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { BestResultsModule } from './best-results/best-results.module';
import { CategoryModule } from './category/category.module';
import typeOrmConfig from './config/typeorm.config';
import { ContentModule } from './content/content.module';
import { CountryModule } from './country/country.module';
import { DocumentModule } from './document/document.module';
import { EventRaceTypeModule } from './event-race-type/event-race-type.module';
import { EventModule } from './event/event.module';
import { GenderModule } from './gender/gender.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { IntegrationModule } from './integration/integration.module';
import { LocationModule } from './location/location.module';
import { MediaModule } from './media/media.module';
import { PaymentsModule } from './payment/payment.module';
import { PushTokenModule } from './push-token/push-token.module';
import { ResetUserModule } from './reset-user/reset-user.module';
import { RoleModule } from './role/role.module';
import { RunnerCoachModule } from './runner-coach/runner-coach.module';
import { StandardModule } from './standard/standard.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TeamModule } from './team/team.module';
import { TimetableModule } from './timetable/timetable.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './users/modules/user.module';
import { EventRaceRegistrationModule } from './event-race-registration/event-race-registration.module';
import { RaceModule } from './race/race.module';
import { RaceRunnerModule } from './race-runner/race-runner.module';
import { RaceTeamModule } from './race-team/race-team.module';
import { PenaltyModule } from './penalty/penalty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    CountryModule,
    MediaModule,
    HashtagModule,
    ContentModule,
    IntegrationModule,
    ResetUserModule,
    PushTokenModule,
    RoleModule,
    UserRoleModule,
    GenderModule,
    CategoryModule,
    BestResultsModule,
    StandardModule,
    SubscriptionModule,
    RunnerCoachModule,
    TeamModule,
    ArticleModule,
    EventModule,
    LocationModule,
    DocumentModule,
    TimetableModule,
    EventRaceTypeModule,
    PaymentsModule,
    EventRaceRegistrationModule,
    RaceModule,
    RaceRunnerModule,
    RaceTeamModule,
    PenaltyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
