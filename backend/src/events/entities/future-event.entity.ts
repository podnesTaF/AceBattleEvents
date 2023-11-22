import { Media } from "src/media/entities/media.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FutureEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Media)
  introImage: Media;

  @Column()
  season: string;

  @Column({ nullable: true })
  date?: Date;
}
