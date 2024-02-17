import { Payment } from 'src/payment/entities/payment.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  userRoleId: number;

  @ManyToOne(() => UserRole, (userRole) => userRole.subscriptions, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'userRoleId' })
  userRole: UserRole;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  payments: Payment[];
}
