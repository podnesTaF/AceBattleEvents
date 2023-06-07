import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoachModule } from './coach/coach.module';
import typeOrmConfig from './config/typeorm.config';
import { EventsModule } from './events/events.module';
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
    UserModule,
    AuthModule,
    EventsModule,
    LocationsModule,
    TeamsModule,
    CoachModule,
    PlayersModule,
    PersonalBestsModule,
    PrizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
