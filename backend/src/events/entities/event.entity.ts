import { LocationEntity } from 'src/locations/entities/locations.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => PrizeEntity, (prize) => prize.event)
  prizes: PrizeEntity[];

  @ManyToMany(() => TeamEntity, (team) => team.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  teams: TeamEntity[];
}
