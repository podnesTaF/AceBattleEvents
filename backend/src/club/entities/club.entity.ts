import { JoinRequest } from 'src/club-requests/entities/club-request.entity';
import { Media } from 'src/media/entities/media.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => User, (user) => user.club)
  members: User[];

  @OneToMany(() => Team, (team) => team.club)
  teams: Team[];

  @ManyToOne(() => Media, { nullable: true })
  logo: Media;

  @ManyToOne(() => Media, { nullable: true })
  photo: Media;

  @ManyToMany(() => JoinRequest, (joinRequest) => joinRequest.club)
  @JoinTable()
  joinRequests: JoinRequest[];

  @ManyToMany(() => User, (user) => user.favoriteClubs)
  favorites: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
