import { Club } from 'src/club/entities/club.entity';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Spectator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ageRange: string;

  @ManyToMany(() => Club, (club) => club.favorites, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  favoriteClubs: Club[];

  @OneToMany(
    () => ViewerRegistration,
    (viewerRegistration) => viewerRegistration.viewer,
    { nullable: true },
  )
  viewerRegistrations: ViewerRegistration[];

  @OneToOne(() => User, (user) => user.spectator, { eager: true })
  @JoinColumn()
  user: User;
}
