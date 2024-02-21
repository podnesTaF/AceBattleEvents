import { Role } from 'src/modules/role/entities/role.entity';
import { Subscription } from 'src/modules/subscription/enitites/subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('user_role')
@Unique(['userId', 'roleId'])
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  assignedAt: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Subscription, (subscription) => subscription.userRole, {
    nullable: true,
  })
  subscriptions: Subscription[];
}
