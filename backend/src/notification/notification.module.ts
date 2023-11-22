import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { User } from "src/users/entities/user.entity";
import { NotificationEntity } from "./entities/notification.entity";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, NotificationEntity, Content])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
