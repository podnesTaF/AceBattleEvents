import { Country } from "src/modules/country/entity/country.entity";
import { EventRaceRegistration } from "src/modules/event-race-registration/entities/event-race-registration.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { Gender } from "src/modules/gender/entities/gender.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column()
  bibNumber: number;

  @Column({ nullable: true })
  qrCodeUrl: string;

  @Column({ nullable: true })
  ticketUrl: string;

  @OneToMany(
    () => EventRaceRegistration,
    (registration) => registration.participant,
  )
  registrations: EventRaceRegistration[];
}
