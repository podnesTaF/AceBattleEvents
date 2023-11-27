import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationEntity } from "./entities/notification.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async createUserNotification(
    createNotificationDto: CreateNotificationDto,
    senderId: number,
  ) {
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });

    const receivers: User[] = [];

    for (const receiverId of createNotificationDto.receivers) {
      const receiver = await this.userRepository.findOne({
        where: { id: receiverId },
      });
      receivers.push(receiver);
    }

    const notification = await this.notificationRepository.save({
      ...createNotificationDto,
      sender,
      receivers,
    });

    const contents: Content[] = [];

    for (const content of createNotificationDto.contents) {
      const created = await this.contentRepository.save({
        ...content,
        notificationId: notification.id,
      });
      contents.push(created);
    }

    notification.contents = contents;

    return this.notificationRepository.save(notification);
  }

  async createSystemNotification(createNotificationDto: CreateNotificationDto) {
    let receivers: User[] = [];

    if (createNotificationDto.type === "all") {
      const allUsers = await this.userRepository.find();
      receivers = allUsers;
    } else {
      for (const receiverId of createNotificationDto.receivers) {
        const receiver = await this.userRepository.findOne({
          where: { id: receiverId },
        });
        receivers.push(receiver);
      }
    }

    const notification = await this.notificationRepository.save({
      ...createNotificationDto,
      receivers,
    });

    const contents: Content[] = [];

    for (const content of createNotificationDto.contents) {
      const created = await this.contentRepository.save({
        ...content,
        notificationId: notification.id,
      });
      contents.push(created);
    }

    notification.contents = contents;

    const updated = await this.notificationRepository.save(notification);

    delete updated.receivers;

    return updated;
  }

  getUserReceivedNotifications(userId: number) {
    return this.notificationRepository.find({
      where: { receivers: { id: userId } },
      relations: ["contents", "sender", "sender.image"],
      order: { createdAt: "DESC" },
    });
  }

  findAll() {
    return `This action returns all notification`;
  }

  async findOne({
    notificationId,
    userId,
  }: {
    notificationId: number;
    userId: number;
  }) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
      relations: ["contents", "sender", "receivers"],
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (!notification.receivers.some((receiver) => receiver.id === userId)) {
      throw new Error("You are not authorized to view this notification");
    }

    notification.status = "read";

    return this.notificationRepository.save(notification);
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
