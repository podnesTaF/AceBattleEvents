import { Content } from 'src/modules/content/entities/content.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class EventPreview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  introImageUrl: string;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true })
  locationInfo?: string;

  @Column({ nullable: true })
  date?: Date;

  @Column({ default: false })
  announced: boolean;

  @ManyToOne(() => Event, { nullable: true })
  event: Event;

  @OneToMany(() => Content, (content) => content.eventPreview)
  contents: Content[];
}
