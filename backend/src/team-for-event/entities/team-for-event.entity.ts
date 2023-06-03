import { EventEntity } from 'src/events/entities/event.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamForEventEntity {
  @PrimaryColumn()
  teamId: number;

  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => TeamEntity, (team) => team.events)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  teams: TeamEntity[];

  @ManyToOne(() => EventEntity, (event) => event.teams)
  @JoinColumn([{ name: 'eventId', referencedColumnName: 'id' }])
  events: EventEntity[];
}
