import { RaceRegistration } from "src/race-registration/entities/race-registration.entity";
import { Runner } from "src/users/entities/runner.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeamRaceRunner {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => RaceRegistration,
    (raceRegistration) => raceRegistration.teamRaceRunners,
    {
      onDelete: "CASCADE",
    },
  )
  raceRegistration: RaceRegistration;

  @ManyToOne(() => Runner, (runner) => runner.runnerForRace, {
    nullable: true,
  })
  runner: Runner;
}
