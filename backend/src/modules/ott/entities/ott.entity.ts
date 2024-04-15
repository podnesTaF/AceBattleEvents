import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OneTimeToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ott: string;

  @Column('text', { nullable: true })
  jwtToken: string;

  @Column({ default: 'auth' })
  goal: string;

  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => User, (user) => user.ottMappings, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;
}
