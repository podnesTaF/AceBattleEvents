import { Country } from 'src/country/entity/country.entity';
import { PersonalBest } from 'src/personal-bests/entities/personal-best.entity';
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

  @Column()
  gender: string;

  @ManyToOne(() => Country, (country) => country.players)
  country: Country;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;

  @OneToMany(() => PersonalBest, (personalBest) => personalBest.player)
  personalBests: PersonalBest[];
}
