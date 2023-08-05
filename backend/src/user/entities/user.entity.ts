import { JoinRequest } from 'src/club-requests/entities/club-request.entity';
import { Club } from 'src/club/entities/club.entity';
import { Country } from 'src/country/entity/country.entity';
import { Media } from 'src/media/entities/media.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  city: string;

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  country: Country;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  worldAthleticsUrl: string;

  @ManyToOne(() => Club, (club) => club.members, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  club: Club;

  @ManyToMany(() => JoinRequest, (joinRequest) => joinRequest.user)
  @JoinTable()
  joinRequests: JoinRequest[];

  @OneToMany(() => Team, (team) => team.manager, { onDelete: 'CASCADE' })
  teams: Team[];

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
