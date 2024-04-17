import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRaceRegistration } from '../event-race-registration/entities/event-race-registration.entity';
import { RegistrationType } from '../event-race-registration/entities/registration-type.entity';
import { EventRaceType } from '../event-race-type/entities/event-race-type.entity';
import { FileService } from '../file/file.service';
import { Participant } from './entities/participant.entity';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Participant,
      RegistrationType,
      EventRaceRegistration,
      EventRaceType,
    ]),
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService, FileService],
})
export class ParticipantModule {}
