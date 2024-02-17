import { RaceTeam } from 'src/race-team/entities/race-team.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('penalty')
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  toAddInMs: number;

  @ManyToMany(() => RaceTeam, (raceTeam) => raceTeam.penalties)
  raceTeams: RaceTeam[];
}
