import { CoachEntity } from 'src/coach/entities/coach.entity';
import { EventEntity } from 'src/events/entities/event.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { UserEntity } from 'src/user/entities/user.entity';
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
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  club: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => UserEntity, (user) => user.teams, { onDelete: 'CASCADE' })
  manager: UserEntity;

  @OneToOne(() => CoachEntity)
  @JoinColumn()
  coach: CoachEntity;

  @OneToMany(() => PlayerEntity, (player) => player.team)
  players: PlayerEntity[];

  @ManyToMany(() => EventEntity, (event) => event.teams, {
    onDelete: 'NO ACTION',
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
  events: EventEntity[];
}
