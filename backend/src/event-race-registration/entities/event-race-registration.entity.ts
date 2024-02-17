import { EventRaceType } from 'src/event-race-type/entities/event-race-type.entity';
import { RegistrationFee } from 'src/event-race-type/entities/registration-fee.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event_race_registration')
export class EventRaceRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  active: boolean;

  @Column({ nullable: true })
  runnerId: number;
  @ManyToOne(() => User, (user) => user.registrations, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'runnerId' })
  runner: User;

  @Column({ nullable: true })
  teamId: number;
  @ManyToOne(() => Team, (team) => team.registrations, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  eventRaceTypeId: number;
  @ManyToOne(
    () => EventRaceType,
    (eventRaceType) => eventRaceType.registrations,
    { onDelete: 'RESTRICT' },
  )
  @JoinColumn({ name: 'eventRaceTypeId' })
  eventRaceType: RegistrationFee;

  @Column()
  feeId: number;
  @ManyToOne(
    () => RegistrationFee,
    (registrationFee) => registrationFee.registrations,
    { onDelete: 'RESTRICT' },
  )
  @JoinColumn({ name: 'feeId' })
  fee: RegistrationFee;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
