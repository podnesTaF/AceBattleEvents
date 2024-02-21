import { Category } from 'src/modules/category/entities/category.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { EventRaceRegistration } from 'src/modules/event-race-registration/entities/event-race-registration.entity';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { JoinRequest } from 'src/modules/join-request/entities/join-request.entity';
import { RaceTeam } from 'src/modules/race-team/entities/race-team.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamPlayer } from './team-player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  countryId: number;

  @ManyToOne(() => Country)
  country: Country;

  @Column()
  city: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @ManyToOne(() => Category, (category) => category.teams)
  category: Category;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  prevRank: number;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  teamBio: string;

  @Column({ nullable: true })
  joinRequestOpen: boolean;

  @Column()
  coachId: number;

  @ManyToOne(() => User, (coach) => coach.coachTeams)
  coach: User;

  @OneToMany(() => TeamPlayer, (teamPlayer) => teamPlayer.team)
  teamRunners: TeamPlayer[];

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.team)
  joinRequests: JoinRequest[];

  @OneToMany(
    () => EventRaceRegistration,
    (eventRaceRegistration) => eventRaceRegistration.team,
  )
  registrations: EventRaceRegistration[];

  @OneToMany(() => RaceTeam, (raceTeam) => raceTeam.team)
  teamRaces: RaceTeam[];
}
