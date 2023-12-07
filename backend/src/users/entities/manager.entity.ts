import { Club } from "src/club/entities/club.entity";
import { Team } from "src/teams/entities/team.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coach } from "./coach.entity";
import { Runner } from "./runner.entity";
import { User } from "./user.entity";

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @OneToMany(() => Team, (team) => team.manager, { onDelete: "CASCADE" })
  teams: Team[];

  @OneToOne(() => Club, (club) => club.manager, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  club: Club;

  @OneToMany(() => Coach, (coach) => coach.manager)
  coaches: Coach[];

  @OneToMany(() => Runner, (runner) => runner.manager)
  runners: Runner[];

  @OneToOne(() => User, (user) => user.manager, { eager: true })
  @JoinColumn()
  user: User;
}
