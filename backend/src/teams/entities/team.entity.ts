import { Club } from 'src/club/entities/club.entity';
import { CoachEntity } from 'src/coach/entities/coach.entity';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
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

  @OneToMany(() => Club, (club) => club.team)
  clubs: Club[];

  @OneToOne(() => CoachEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  coach: CoachEntity;

  @OneToMany(() => PlayerEntity, (player) => player.team, {
    onDelete: 'CASCADE',
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
