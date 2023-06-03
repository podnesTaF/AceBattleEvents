import { TeamEntity } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  club: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => TeamEntity, (team) => team.manager)
  teams: TeamEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
