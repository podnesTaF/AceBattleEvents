import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude: number;
}
