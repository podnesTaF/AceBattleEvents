import { BestResult } from 'src/best-results/entities/best-result.entity';
import { Category } from 'src/category/entities/category.entity';
import { Country } from 'src/country/entity/country.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { PushToken } from 'src/push-token/entities/push-token.entity';
import { Team } from 'src/teams/entities/team.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Runner } from './runner.entity';

export enum MemberRole {
  RUNNER = 'runner',
  SPECTATOR = 'spectator',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => Gender, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column()
  city: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  newsSubscription: boolean;

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

  @OneToMany(() => BestResult, (bestResult) => bestResult.runner)
  bestResults: BestResult[];

  @ManyToOne(() => Category, (category) => category.runners, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => PushToken, (pushToken) => pushToken.user)
  pushTokens: PushToken[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
