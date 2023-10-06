import { Best } from 'src/bests/entities/best.entity';
import { JoinRequest } from 'src/club-requests/entities/club-request.entity';
import { Club } from 'src/club/entities/club.entity';
import { RunnerResult } from 'src/runner-results/entities/runner-results.entity';
import { Team } from 'src/teams/entities/team.entity';
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
import { User } from './user.entity';

export enum RunnerCategory {
  PROFESSIONAL = 'professional',
  AMATEUR = 'amateur',
}

@Entity()
export class Runner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  worldAthleticsUrl: string;

  @Column({ default: 'professional' })
  category: RunnerCategory;

  @OneToMany(() => RunnerResult, (result) => result.runner)
  results: RunnerResult[];

  @OneToMany(() => RunnerResult, (res) => res.pbForRunner, { nullable: true })
  personalBests: RunnerResult[];

  @OneToMany(() => Best, (best) => best.runnerPb, { nullable: true })
  selfDefinedPB: Best[];

  @OneToMany(() => Best, (best) => best.runnerSb, { nullable: true })
  selfDefinedSB: Best[];

  @ManyToMany(() => Team, (team) => team.players, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  teamsAsRunner: Team[];

  @ManyToOne(() => Club, (club) => club.runners, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  club: Club;

  @Column({ nullable: true })
  totalPoints: number;

  @Column({ default: 9999, nullable: true })
  rank: number;

  @OneToOne(() => User, (user) => user.runner, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => JoinRequest, (joinRequest) => joinRequest.runner)
  @JoinTable()
  joinRequests: JoinRequest[];
}
