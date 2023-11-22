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
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: { user: { id: number } },
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.create(createNotificationDto, req.user.id);
  }

  @Get("/received")
  @UseGuards(JwtAuthGuard)
  getUserReceivedNotifications(@Request() req: { user: { id: number } }) {
    return this.notificationService.getUserReceivedNotifications(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
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
