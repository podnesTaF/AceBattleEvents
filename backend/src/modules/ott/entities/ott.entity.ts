import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToOne(() => User, (user) => user.ottMappings)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;
}
