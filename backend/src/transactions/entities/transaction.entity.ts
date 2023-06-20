import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  type: string;

  @Column()
  txHash: string;

  @Column()
  wallet: string;

  @ManyToOne(() => UserEntity, (user) => user.transactionsAsSender)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactionsAsReceiver)
  receiver: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;
}
