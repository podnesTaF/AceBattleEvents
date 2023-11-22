import { Content } from "src/content/entities/content.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "direct" })
  type: string;

  @Column({ default: "unread" })
  status: string;

  @OneToMany(() => Content, (content) => content.notification, {
    nullable: true,
  })
  @JoinTable()
  contents: Content[];

  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender: User;

  @ManyToMany(() => User, (user) => user.receivedNotifications)
  @JoinTable()
  receivers: User[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
