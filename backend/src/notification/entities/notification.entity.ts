import { Content } from "src/content/entities/content.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "system" })
  type: string;

  @Column({ default: "unread" })
  status: string;

  @ManyToMany(() => Content, (content) => content.notifications, {
    nullable: true,
  })
  @JoinTable({
    name: "content_for_notification",
  })
  contents: Content[];

  @ManyToOne(() => User, (user) => user.sentNotifications, { nullable: true })
  sender?: User;

  @ManyToMany(() => User, (user) => user.receivedNotifications)
  @JoinTable()
  receivers: User[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
