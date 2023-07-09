import { Club } from 'src/club/entities/club.entity';
import { Coach } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  city: string;

  @ManyToOne(() => Country, (country) => country.teams)
  country: Country;

  @ManyToOne(() => User, (user) => user.teams, { onDelete: 'CASCADE' })
  manager: User;

  @OneToMany(() => Club, (club) => club.team, { nullable: true })
  clubs: Club[];

  @Column()
  club: string;

  @OneToOne(() => Coach, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  coach: Coach;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  logo: Media;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn()
  teamImage: Media;

  @OneToMany(() => PlayerEntity, (player) => player.team, {
    onDelete: 'CASCADE',
    eager: true,
  })
  players: PlayerEntity[];

  @ManyToMany(() => Event, (event) => event.teams, {
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'team_for_event',
    joinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'eventId',
      referencedColumnName: 'id',
    },
  })
  events: Event[];
}
