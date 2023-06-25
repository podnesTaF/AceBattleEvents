import { Country } from 'src/country/entity/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @ManyToOne(() => Country, (country) => country.locations)
  country: Country;
}
