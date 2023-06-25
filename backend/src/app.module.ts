import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { CoachModule } from './coach/coach.module';
import typeOrmConfig from './config/typeorm.config';
import { CountryModule } from './country/country.module';
import { EventsModule } from './events/events.module';
import { FileModule } from './file/file.module';
import { LocationsModule } from './locations/locations.module';
import { PersonalBestsModule } from './personal-bests/personal-bests.module';
import { PlayersModule } from './players/players.module';
import { PrizesModule } from './prizes/prizes.module';
import { TeamsModule } from './teams/teams.module';
import { UserModule } from './user/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
