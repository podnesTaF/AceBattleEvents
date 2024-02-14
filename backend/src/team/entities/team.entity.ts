import { Category } from 'src/category/entities/category.entity';
import { Country } from 'src/country/entity/country.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamPlayer } from './team-player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  countryId: number;

  @ManyToOne(() => Country)
  country: Country;

  @Column()
  city: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @ManyToOne(() => Category, (category) => category.teams)
  category: Category;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  prevRank: number;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  teamBio: string;

  @Column()
  coachId: number;

  @ManyToOne(() => User, (coach) => coach.coachTeams)
  coach: User;

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.team)
  teamRunners: TeamPlayer[];
}
