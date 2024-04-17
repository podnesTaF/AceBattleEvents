import { Country } from 'src/modules/country/entity/country.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  placeImageUrl: string;

  @Column()
  countryId: number;

  @Column({ nullable: true })
  stadiumName: string;

  @ManyToOne(() => Country)
  country: Country;

  @OneToMany(() => Event, (event) => event.location)
  events: Event[];
}
