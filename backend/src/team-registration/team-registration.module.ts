import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { Event } from "src/events/entities/event.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { NotificationService } from "src/notification/notification.service";
import { PushToken } from "src/push-token/entities/push-token.entity";
import { TokenService } from "src/push-token/push-token.service";
import { Team } from "src/teams/entities/team.entity";
import { Coach } from "src/users/entities/coach.entity";
import { User } from "src/users/entities/user.entity";
import { TeamRegistration } from "./entities/team-registration.entity";
import { TeamRegistrationController } from "./team-registration.controller";
import { TeamRegistrationService } from "./team-registration.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRegistration,
      Team,
      Event,
      Coach,
      Content,
      User,
      NotificationEntity,
      PushToken,
    ]),
  ],
  controllers: [TeamRegistrationController],
  providers: [TeamRegistrationService, NotificationService, TokenService],
})
export class TeamRegistrationModule {}
