import { Standard } from 'src/modules/standard/entities/standard.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  rank: number;

  @OneToMany(() => User, (user) => user.category)
  runners: User[];

  @OneToMany(() => Standard, (standard) => standard.category)
  standards: Standard[];

  @OneToMany(() => Team, (team) => team.category)
  teams: Team[];
}
