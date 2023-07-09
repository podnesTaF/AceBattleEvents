import { Club } from 'src/club/entities/club.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  imageUrl: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Club, (club) => club.manager, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  club: Club;

  @OneToMany(() => Team, (team) => team.manager, { onDelete: 'CASCADE' })
  teams: Team[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
