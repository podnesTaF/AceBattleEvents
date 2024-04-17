import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('team_player')
export class TeamPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  runnerId: number;

  @Column()
  teamId: number;

  @Column()
  memberSince: Date;

  @Column({ nullable: true })
  memberUntil: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.runnerTeams)
  @JoinColumn({ name: 'runnerId' })
  runner: User;

  @ManyToOne(() => Team, (team) => team.teamRunners)
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
