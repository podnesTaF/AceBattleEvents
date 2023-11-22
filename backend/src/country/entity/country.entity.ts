import { Location } from 'src/locations/entities/locations.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  flagIconUrl: string;

  @OneToMany(() => PlayerEntity, (player) => player.country)
  players: PlayerEntity[];

  @OneToMany(() => Team, (team) => team.country)
  teams: Team[];

  @OneToMany(() => Location, (location) => location.country)
  locations: Location[];
}