import { ApiProperty } from '@nestjs/swagger';
import { BestResult } from 'src/best-results/entities/best-result.entity';
import { Category } from 'src/category/entities/category.entity';
import { Country } from 'src/country/entity/country.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { PushToken } from 'src/push-token/entities/push-token.entity';
import { RunnerCoach } from 'src/runner-coach/entity/runner-coach.entity';
import { TeamPlayer } from 'src/team/entities/team-player.entity';
import { Team } from 'src/team/entities/team.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ApiProperty({ minimum: 8, example: 'Password-12' })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  genderId: number;

  @ManyToOne(() => Gender, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth: Date;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user, nullable',
  })
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @Column({ nullable: true })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    description: "URL to the user's full scale image, nullable",
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({
    description: "URL to the user's avatar image, nullable",
  })
  @Column({ nullable: true })
  avatarUrl: string;

  @ApiProperty({
    description: 'Indicates if the user is subscribed to news updates',
  })
  @Column({ default: false })
  newsSubscription: boolean;

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

  @OneToMany(() => RunnerCoach, (runnerCoach) => runnerCoach.runner, {
    nullable: true,
  })
  runnerCoaches: RunnerCoach[];

  @OneToMany(() => RunnerCoach, (runnerCoach) => runnerCoach.coach, {
    nullable: true,
  })
  coachRunners: RunnerCoach[];

  @OneToMany(() => RunnerCoach, (runnerCoach) => runnerCoach.initiator, {
    nullable: true,
  })
  requestsInitiated: RunnerCoach[];

  @OneToMany(() => Team, (team) => team.coach, { nullable: true })
  coachTeams: Team[];

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.runner, {
    nullable: true,
  })
  runnerTeams: Team[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
