import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;
}
