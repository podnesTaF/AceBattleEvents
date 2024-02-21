import { ApiProperty } from '@nestjs/swagger';
import { BestResult } from 'src/modules/best-results/entities/best-result.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { JoinRequest } from 'src/modules/join-request/entities/join-request.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
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
  secondName: string;

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
  imageName: string;

  @ApiProperty({
    description: "URL to the user's avatar image, nullable",
  })
  @Column({ nullable: true })
  avatarName: string;

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

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => VisitorTicket, (visitorTicket) => visitorTicket.user)
  visitorTickets: VisitorTicket[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
