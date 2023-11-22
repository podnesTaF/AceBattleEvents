import { Country } from 'src/country/entity/country.entity';
import { Media } from 'src/media/entities/media.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  country: Country;

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @ManyToMany(() => Team, (team) => team.players, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  teams: Team[];
}