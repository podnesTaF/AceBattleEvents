import { Penalty } from 'src/penalty/entities/penalty.entity';
import { Race } from 'src/race/entities/race.entity';
import { Team } from 'src/team/entities/team.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('race_team')
export class RaceTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamId: number;
  @ManyToOne(() => Team, (team) => team.teamRaces, {
    onDelete: 'RESTRICT',
  })
  team: Team;

  @Column()
  raceId: number;
  @ManyToOne(() => Race, (race) => race.raceTeams, {
    onDelete: 'RESTRICT',
  })
  race: Race;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  finished: boolean;

  @Column({ nullable: true })
  won: boolean;

  @Column({ nullable: true })
  totalTimeInMs: number;

  @ManyToMany(() => Penalty, (penalty) => penalty.raceTeams)
  penalties: Penalty[];
}
