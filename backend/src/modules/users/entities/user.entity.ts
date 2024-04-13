import { ApiProperty } from '@nestjs/swagger';
import { BestResult } from 'src/modules/best-results/entities/best-result.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { JoinRequest } from 'src/modules/join-request/entities/join-request.entity';
import { OneTimeToken } from 'src/modules/ott/entities/ott.entity';
import { PushToken } from 'src/modules/push-token/entities/push-token.entity';
import { Race } from 'src/modules/race/entities/race.entity';
import { TeamPlayer } from 'src/modules/team/entities/team-player.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { VisitorTicket } from 'src/visitor-ticket/entities/visitor-ticket.entity';
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
  lastName: string;

  @Column({ unique: true })
  email: string;

  @ApiProperty({ minimum: 8, example: 'Password-12' })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  oauthProvider: string;

  @Column({ nullable: true })
  oauthId: string;

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
  customerId: string;

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

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @ApiProperty({
    description: 'Indicates if the user is subscribed to news updates',
  })
  @Column({ default: true })
  notificationsEnabled: boolean;

  @Column({ nullable: true })
  totalPoints: number;

  @Column({ default: 9999, nullable: true })
  rank: number;

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

  @OneToMany(() => Team, (team) => team.coach, { nullable: true })
  coachTeams: Team[];

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.runner, {
    nullable: true,
  })
  runnerTeams: TeamPlayer[];

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.runner, {
    nullable: true,
  })
  joinRequests: JoinRequest[];

  @OneToMany(
    () => EventRaceRegistration,
    (eventRaceRegistration) => eventRaceRegistration.runner,
    {
      nullable: true,
    },
  )
  registrations: EventRaceRegistration[];

  @OneToMany(() => Race, (race) => race.raceRunners, { nullable: true })
  runnerForRaces: Race[];

  @OneToMany(() => VisitorTicket, (visitorTicket) => visitorTicket.user)
  visitorTickets: VisitorTicket[];

  @OneToMany(() => OneTimeToken, (ott) => ott.user)
  ottMappings: OneTimeToken[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
