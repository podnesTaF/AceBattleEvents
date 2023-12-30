import { Country } from "src/country/entity/country.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Media } from "src/media/entities/media.entity";
import { NotificationEntity } from "src/notification/entities/notification.entity";
import { PushToken } from "src/push-token/entities/push-token.entity";
import { Team } from "src/teams/entities/team.entity";
import { ViewerRegistration } from "src/viewer-registrations/entities/viewer-registration.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Coach } from "./coach.entity";
import { Manager } from "./manager.entity";
import { Runner } from "./runner.entity";
import { Spectator } from "./spectator.entity";

export enum MemberRole {
  RUNNER = "runner",
  SPECTATOR = "spectator",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: "spectator" })
  role: string;

  @Column({ nullable: true, type: "text" })
  interest: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  city: string;

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: "SET NULL",
    nullable: true,
  })
  country: Country;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  rolePending: string;

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @ManyToOne(() => Media, { nullable: true })
  avatar: Media;

  @Column({ nullable: true })
  ageRange: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ default: false })
  acceptTerms: boolean;

  @Column({ default: false })
  acceptNews: boolean;

  @OneToOne(() => Spectator, (spectator) => spectator.user, {
    nullable: true,
  })
  spectator: Spectator;

  @OneToOne(() => Manager, (manager) => manager.user, {
    nullable: true,
  })
  manager: Manager;

  @OneToOne(() => Runner, (runner) => runner.user, {
    nullable: true,
  })
  runner: Runner;

  @OneToOne(() => Coach, (coach) => coach.user, {
    nullable: true,
  })
  coach: Coach;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => NotificationEntity, (notification) => notification.sender)
  sentNotifications: NotificationEntity[];

  @ManyToMany(
    () => NotificationEntity,
    (notification) => notification.receivers,
  )
  receivedNotifications: NotificationEntity[];

  @ManyToMany(() => Runner, (runner) => runner.followers)
  @JoinTable()
  followingRunners: Runner[];

  @ManyToMany(() => Team, (team) => team.followers)
  @JoinTable()
  followingTeams: Team[];

  @OneToMany(
    () => ViewerRegistration,
    (viewerRegistration) => viewerRegistration.viewer,
    { nullable: true },
  )
  viewerRegistrations: ViewerRegistration[];

  @OneToMany(() => PushToken, (pushToken) => pushToken.user)
  pushTokens: PushToken[];
}
