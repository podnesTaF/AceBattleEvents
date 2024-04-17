import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventRaceRegistration } from './event-race-registration.entity';

@Entity('registration_type')
export class RegistrationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => EventRaceRegistration, (registration) => registration.type)
  registrations: EventRaceRegistration[];
}
