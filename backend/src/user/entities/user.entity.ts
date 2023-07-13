import { Club } from 'src/club/entities/club.entity';
import { Media } from 'src/media/entities/media.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column()
  country: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Club, (club) => club.manager, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  club: Club;

  @ManyToOne(() => Media, { nullable: true })
  @OneToMany(() => Team, (team) => team.manager, { onDelete: 'CASCADE' })
  teams: Team[];

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
