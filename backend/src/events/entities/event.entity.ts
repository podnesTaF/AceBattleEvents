import { LocationEntity } from 'src/locations/entities/locations.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  price: number;

  @OneToOne(() => LocationEntity)
  @JoinColumn()
  location: LocationEntity;

  @ManyToMany(() => TeamEntity, (team) => team.events)
  teams?: TeamEntity[];
}
