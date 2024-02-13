import { Standard } from 'src/standard/entities/standard.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => User, (user) => user.category)
  runners: User[];

  @OneToMany(() => Standard, (standard) => standard.category)
  standards: Standard[];
}
