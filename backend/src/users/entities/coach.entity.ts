import { Team } from "src/teams/entities/team.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Manager } from "./manager.entity";
import { User } from "./user.entity";

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Manager, (manager) => manager.coaches, {
    nullable: true,
  })
  manager: Manager;

  @OneToMany(() => Team, (team) => team.coach, { nullable: true })
  teams: Team[];

  @OneToOne(() => User, (user) => user.coach)
  @JoinColumn()
  user: User;
}
