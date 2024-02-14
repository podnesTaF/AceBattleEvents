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

  get flagIconUrl(): string {
    return this.shortName
      ? `https://flagcdn.com/${this.shortName.toLowerCase()}.svg`
      : null;
  }

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
