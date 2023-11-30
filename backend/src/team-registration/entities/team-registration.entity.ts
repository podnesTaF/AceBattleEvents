import { Event } from "src/events/entities/event.entity";
import { Team } from "src/teams/entities/team.entity";
import { Coach } from "src/users/entities/coach.entity";
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class TeamRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.eventRegistrations, {
    onDelete: "CASCADE",
  })
  team: Team;

  @ManyToOne(() => Event, (event) => event.teamRegistrations, {
    onDelete: "CASCADE",
  })
  event: Event;

  @ManyToOne(() => Coach, (coach) => coach.teamRegistrations, {
    onDelete: "CASCADE",
  })
  coach: Coach;

  @CreateDateColumn()
  createdAt: Date;
}
