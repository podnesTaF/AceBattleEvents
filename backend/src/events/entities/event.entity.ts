import { Location } from 'src/locations/entities/locations.entity';
import { Media } from 'src/media/entities/media.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => Media, { nullable: true, eager: true })
  @JoinColumn()
  introImage: Media;

  @ManyToOne(() => Media, { nullable: true, eager: true })
  @JoinColumn()
  minorImage: Media;

  @OneToOne(() => Location, { onDelete: 'CASCADE' })
  @JoinColumn()
  location: Location;

  @OneToMany(() => PrizeEntity, (prize) => prize.event, { onDelete: 'CASCADE' })
  prizes: PrizeEntity[];

  @ManyToMany(() => Team, (team) => team.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  teams: Team[];
}
