import { JoinRequest } from 'src/club-requests/entities/club-request.entity';
import { Country } from 'src/country/entity/country.entity';
import { Media } from 'src/media/entities/media.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { Spectator } from 'src/users/entities/spectator.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @ManyToOne(() => Country, { nullable: true })
  country: Country;

  @OneToMany(() => Runner, (runner) => runner.club)
  runners: Runner[];

  @OneToOne(() => Manager, (manager) => manager.club)
  manager: Manager;

  @OneToMany(() => Team, (team) => team.club)
  teams: Team[];

  @ManyToOne(() => Media, { nullable: true })
  logo: Media;

  @ManyToOne(() => Media, { nullable: true })
  photo: Media;

  @ManyToMany(() => JoinRequest, (joinRequest) => joinRequest.club)
  @JoinTable()
  joinRequests: JoinRequest[];

  @ManyToMany(() => Spectator, (spectator) => spectator.favoriteClubs, {
    onDelete: 'CASCADE',
  })
  favorites: Spectator[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
