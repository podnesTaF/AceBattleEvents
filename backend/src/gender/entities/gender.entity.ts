import { Standard } from 'src/standard/entities/standard.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gender')
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Standard, (standard) => standard.gender)
  standards: Standard[];
}
