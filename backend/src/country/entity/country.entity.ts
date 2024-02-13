import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneCode: string;

  @Column({ nullable: true })
  shortName: string;

  @Column({ nullable: true })
  flagIconUrl: string;

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
