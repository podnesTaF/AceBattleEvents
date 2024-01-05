import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { PushToken } from "src/push-token/entities/push-token.entity";
import { TokenService } from "src/push-token/push-token.service";
import { Team } from "src/teams/entities/team.entity";
import { User } from "src/users/entities/user.entity";
import { NotificationEntity } from "./entities/notification.entity";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      NotificationEntity,
      PushToken,
      Content,
      Team,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, TokenService],
  exports: [NotificationService],
})
export class NotificationModule {}
