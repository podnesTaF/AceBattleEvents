import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { EventRaceRegistration } from './entities/event-race-registration.entity';
import { RegistrationType } from './entities/registration-type.entity';
import { EventRaceRegistrationController } from './event-race-registration.controller';
import { EventRaceRegistrationService } from './event-race-registration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRaceRegistration, User, RegistrationType]),
  ],
  controllers: [EventRaceRegistrationController],
  providers: [EventRaceRegistrationService],
})
export class EventRaceRegistrationModule {}
