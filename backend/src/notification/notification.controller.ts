import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post("/user")
  @UseGuards(JwtAuthGuard)
  createUserNotification(
    @Request() req: { user: { id: number } },
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createUserNotification(
      createNotificationDto,
      req.user.id,
    );
  }

  @Post("/system")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  createSystemNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createSystemNotification(
      createNotificationDto,
    );
  }

  @Get("/received")
  @UseGuards(JwtAuthGuard)
  getUserReceivedNotifications(@Request() req: { user: { id: number } }) {
    return this.notificationService.getUserReceivedNotifications(req.user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.notificationService.findOne({
      notificationId: +id,
      userId: req.user.id,
    });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationService.remove(+id);
  }
}
