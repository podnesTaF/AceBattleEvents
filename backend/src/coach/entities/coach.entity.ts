import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoachEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;
}
