import { TeamEntity } from 'src/teams/entities/team.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
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

  @Column({ nullable: true })
  walletId: string;

  @OneToMany(() => TeamEntity, (team) => team.manager)
  teams: TeamEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.sender)
  transactionsAsSender: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.receiver)
  transactionsAsReceiver: TransactionEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
