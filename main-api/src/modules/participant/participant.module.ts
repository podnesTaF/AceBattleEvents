import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRaceRegistration } from "../event-race-registration/entities/event-race-registration.entity";
import { RegistrationType } from "../event-race-registration/entities/registration-type.entity";
import { EventRaceType } from "../event-race-type/entities/event-race-type.entity";
import { FileService } from "../file/file.service";
import { OneTimeToken } from "../ott/entities/ott.entity";
import { OneTimeTokenService } from "../ott/ott.service";
import { Participant } from "./entities/participant.entity";
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Participant,
      RegistrationType,
      EventRaceRegistration,
      EventRaceType,
      OneTimeToken,
    ]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: "120h" },
        };
      },
    }),
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService, FileService, OneTimeTokenService],
})
export class ParticipantModule {}

