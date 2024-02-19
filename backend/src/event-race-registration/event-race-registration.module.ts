import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EventRaceRegistration } from './entities/event-race-registration.entity';
import { EventRaceRegistrationController } from './event-race-registration.controller';
import { EventRaceRegistrationService } from './event-race-registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRaceRegistration, User])],
  controllers: [EventRaceRegistrationController],
  providers: [EventRaceRegistrationService],
})
export class EventRaceRegistrationModule {}
