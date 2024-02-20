import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import config from './core/Config/typeorm.config';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { BestResultsModule } from './modules/best-results/best-results.module';
import { CategoryModule } from './modules/category/category.module';
import { ContentModule } from './modules/content/content.module';
import { CountryModule } from './modules/country/country.module';
import { DocumentModule } from './modules/document/document.module';
import { EventRaceRegistrationModule } from './modules/event-race-registration/event-race-registration.module';
import { EventRaceTypeModule } from './modules/event-race-type/event-race-type.module';
import { EventModule } from './modules/event/event.module';
import { FileModule } from './modules/file/file.module';
import { GenderModule } from './modules/gender/gender.module';
import { HashtagModule } from './modules/hashtag/hashtag.module';
import { IntegrationModule } from './modules/integration/integration.module';
import { LocationModule } from './modules/location/location.module';
import { MediaModule } from './modules/media/media.module';
import { PaymentsModule } from './modules/payment/payment.module';
import { PenaltyModule } from './modules/penalty/penalty.module';
import { PushTokenModule } from './modules/push-token/push-token.module';
import { RaceRunnerModule } from './modules/race-runner/race-runner.module';
import { RaceTeamModule } from './modules/race-team/race-team.module';
import { RaceModule } from './modules/race/race.module';
import { ResetUserModule } from './modules/reset-user/reset-user.module';
import { RoleModule } from './modules/role/role.module';
import { RunnerCoachModule } from './modules/runner-coach/runner-coach.module';
import { SplitModule } from './modules/split/split.module';
import { StandardModule } from './modules/standard/standard.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { TeamModule } from './modules/team/team.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/users/modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
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
    MediaModule,
    PenaltyModule,
    SplitModule,
    FileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer.apply(HttpRequestLogger).forRoutes('*');
    }
  }
}
