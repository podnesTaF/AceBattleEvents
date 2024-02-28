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

  @Column('text')
  jwtToken: string;

  @Column({ default: 'auth' })
  goal: string;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.ottMappings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;
}
