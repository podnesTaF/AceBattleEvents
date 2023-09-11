import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubRequestsModule } from './club-requests/club-requests.module';
import { ClubModule } from './club/club.module';
import { CoachModule } from './coach/coach.module';
import typeOrmConfig from './config/typeorm.config';
import { ContentModule } from './content/content.module';
import { CountryModule } from './country/country.module';
import { EventsModule } from './events/events.module';
import { FileModule } from './file/file.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { IntegrationModule } from './integration/integration.module';
import { LocationsModule } from './locations/locations.module';
import { MediaModule } from './media/media.module';
import { NewsModule } from './news/news.module';
import { PersonalBestsModule } from './personal-bests/personal-bests.module';
import { PlayersModule } from './players/players.module';
import { PrizesModule } from './prizes/prizes.module';
import { RaceModule } from './race/race.module';
import { RunnerResultsModule } from './runner-results/runner-results.module';
import { SplitsModule } from './splits/splits.module';
import { TeamResultsModule } from './team-results/team-results.module';
import { TeamsModule } from './teams/teams.module';
import { UserModule } from './user/user.module';
import { ViewerRegistrationsModule } from './viewer-registrations/viewer-registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the ConfigModule to load environment variables
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    EventsModule,
    LocationsModule,
    TeamsModule,
    CoachModule,
    PlayersModule,
    PersonalBestsModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
