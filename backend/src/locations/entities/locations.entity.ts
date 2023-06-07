import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
