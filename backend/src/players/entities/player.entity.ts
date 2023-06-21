import { PersonalBestEntity } from 'src/personal-bests/entities/personal-best.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  dateOfBirth: Date;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  @OneToMany(() => PersonalBestEntity, (personalBest) => personalBest.player)
  personalBests: PersonalBestEntity[];
}
