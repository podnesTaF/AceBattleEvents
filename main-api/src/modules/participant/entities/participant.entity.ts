import { Country } from "src/modules/country/entity/country.entity";
import { EventRaceRegistration } from "src/modules/event-race-registration/entities/event-race-registration.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { Gender } from "src/modules/gender/entities/gender.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: "confirmation" })
  status: string;

  @Column()
  eventId: number;
  @ManyToOne(() => Event, (event) => event.participants, {
    onDelete: "RESTRICT",
  })
  event: Event;

  @Column()
  dateOfBirth: string;

  @Column()
  genderId: number;
  @ManyToOne(() => Gender)
  gender: Gender;

  @Column()
  countryId: number;
  @ManyToOne(() => Country)
  country: Country;

  @Column()
  city: string;

  @Column()
  phoneCode: string;
  @Column()
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  bibNumber: number;

  @Column({ nullable: true })
  entranceHash: string;

  @Column({ nullable: true })
  qrCodeUrl: string;

  @Column({ nullable: true })
  ticketUrl: string;

  @OneToMany(
    () => EventRaceRegistration,
    (registration) => registration.participant,
  )
  registrations: EventRaceRegistration[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
