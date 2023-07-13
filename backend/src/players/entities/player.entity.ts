import { Country } from 'src/country/entity/country.entity';
import { Media } from 'src/media/entities/media.entity';
import { PersonalBest } from 'src/personal-bests/entities/personal-best.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  ManyToMany,
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

  @Column({ nullable: true })
  worldAthleticsUrl: string;

  @ManyToOne(() => Country, (country) => country.players)
  country: Country;

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @ManyToMany(() => Team, (team) => team.players, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  teams: Team[];

  @OneToMany(() => PersonalBest, (personalBest) => personalBest.player)
  personalBests: PersonalBest[];
}
