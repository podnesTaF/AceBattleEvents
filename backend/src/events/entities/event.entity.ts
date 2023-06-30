import { Location } from 'src/locations/entities/locations.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { Team } from 'src/teams/entities/team.entity';
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
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDateTime: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  introImageUrl: string;

  @Column({ nullable: true })
  minorImageUrl: string;

  @OneToOne(() => Location)
  @JoinColumn()
  location: Location;

  @OneToMany(() => PrizeEntity, (prize) => prize.event)
  prizes: PrizeEntity[];

  @ManyToMany(() => Team, (team) => team.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  teams: Team[];
}
