import { EventEntity } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: number;

  @Column()
  sum: number;

  @ManyToOne(() => EventEntity, (event) => event.prizes)
  event: EventEntity;
}
