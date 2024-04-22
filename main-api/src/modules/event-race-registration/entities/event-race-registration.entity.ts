import { EventRaceType } from "src/modules/event-race-type/entities/event-race-type.entity";
import { RegistrationFee } from "src/modules/event-race-type/entities/registration-fee.entity";
import { Participant } from "src/modules/participant/entities/participant.entity";
import { Team } from "src/modules/team/entities/team.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RegistrationType } from "./registration-type.entity";

@Entity("event_race_registration")
export class EventRaceRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  runnerId: number;
  @ManyToOne(() => User, (user) => user.registrations, {
    onDelete: "RESTRICT",
    nullable: true,
  })
  @JoinColumn({ name: "runnerId" })
  runner: User;

  @Column({ nullable: true })
  teamId: number;
  @ManyToOne(() => Team, (team) => team.registrations, {
    onDelete: "RESTRICT",
    nullable: true,
  })
  @JoinColumn({ name: "teamId" })
  team: Team;

  @Column({ nullable: true })
  participantId: number;
  @ManyToOne(() => Participant, (participant) => participant.registrations, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "participantId" })
  participant: Participant;

  @Column({ nullable: true })
  typeId: number;
  @ManyToOne(() => RegistrationType, (t) => t.registrations, { nullable: true })
  @JoinColumn({ name: "typeId" })
  type: RegistrationType;

  @Column()
  eventRaceTypeId: number;
  @ManyToOne(
    () => EventRaceType,
    (eventRaceType) => eventRaceType.registrations,
    { onDelete: "RESTRICT" },
  )
  @JoinColumn({ name: "eventRaceTypeId" })
  eventRaceType: EventRaceType;

  @Column({ nullable: true })
  feeId: number;
  @ManyToOne(
    () => RegistrationFee,
    (registrationFee) => registrationFee.registrations,
    { onDelete: "RESTRICT", nullable: true },
  )
  @JoinColumn({ name: "feeId" })
  fee: RegistrationFee;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
