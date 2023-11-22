import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  mediaUrl: string;

  @Column({ nullable: true })
  smallUrl: string;

  @Column()
  mediaType: string;
}