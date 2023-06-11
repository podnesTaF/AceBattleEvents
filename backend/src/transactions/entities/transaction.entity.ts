import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.transactionsAsSender)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactionsAsReceiver)
  receiver: UserEntity;
}
