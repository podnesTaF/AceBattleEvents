import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { Location } from 'src/locations/entities/locations.entity';
import { Media } from 'src/media/entities/media.entity';
import { PrizeEntity } from 'src/prizes/entities/prize.entity';
import { Race } from 'src/race/entities/race.entity';
import { Team } from 'src/teams/entities/team.entity';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
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

  @Column({
    default: 'outdoor',
  })
  category: string;

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

  @OneToMany(
    () => ViewerRegistration,
    (viewerRegistration) => viewerRegistration.event,
  )
  viewerRegistrations: ViewerRegistration[];

  @ManyToMany(() => Team, (team) => team.events, {
    onDelete: 'CASCADE',
  })
  teams: Team[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.events, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  hashtags: Hashtag[];

  @OneToMany(() => Race, (race) => race.event, { nullable: true })
  races: Race;
}
