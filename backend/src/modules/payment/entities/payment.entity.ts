import { Subscription } from 'src/modules/subscription/enitites/subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentPurpose } from './payment-purpose.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  approvedAt: Date;

  @Column()
  purposeId: number;
  @ManyToOne(() => PaymentPurpose, (paymentPurpose) => paymentPurpose.payments)
  @JoinColumn({ name: 'purposeId' })
  purpose: PaymentPurpose;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column({ nullable: true })
  subscriptionId: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments)
  subscription: Subscription;
}
