import { Best } from 'src/bests/entities/best.entity';
import { Country } from 'src/country/entity/country.entity';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum MemberRole {
  RUNNER = 'runner',
  SPECTATOR = 'spectator',
}

export enum RunnerCategory {
  PROFESSIONAL = 'professional',
  AMATEUR = 'amateur',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: MemberRole;

  @Column({ nullable: true })
  category: RunnerCategory;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  city: string;

  @Column()
  gender: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  ageRange: string;

  @Column({ type: 'text', nullable: true })
  interest: string;

  @ManyToOne(() => Country)
  country: Country;

  @OneToMany(() => Best, (best) => best.memberPb, { nullable: true })
  personalBests: Best[];

  @OneToMany(() => Best, (best) => best.memberSb, { nullable: true })
  seasonBests: Best[];

  @OneToMany(
    () => ViewerRegistration,
    (viewerRegistration) => viewerRegistration.viewer,
    { nullable: true },
  )
  viewerRegistrations: ViewerRegistration[];
}
