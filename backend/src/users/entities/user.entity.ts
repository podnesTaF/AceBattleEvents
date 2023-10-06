import { Country } from 'src/country/entity/country.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Media } from 'src/media/entities/media.entity';
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
import { Manager } from './manager.entity';
import { Runner } from './runner.entity';
import { Spectator } from './spectator.entity';

export enum MemberRole {
  RUNNER = 'runner',
  SPECTATOR = 'spectator',
}

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

  @Column({ nullable: true, type: 'text' })
  interest: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  city: string;

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  country: Country;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => Media, { nullable: true })
  image: Media;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ default: false })
  acceptTerms: boolean;

  @Column({ default: false })
  acceptNews: boolean;

  @OneToOne(() => Spectator, (spectator) => spectator.user, {
    nullable: true,
  })
  spectator: Spectator;

  @OneToOne(() => Manager, (manager) => manager.user, {
    nullable: true,
  })
  manager: Manager;

  @OneToOne(() => Runner, (runner) => runner.user, {
    nullable: true,
  })
  runner: Runner;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];
}
