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

  @OneToOne(() => User, (user) => user.manager, { eager: true })
  @JoinColumn()
  user: User;
}
