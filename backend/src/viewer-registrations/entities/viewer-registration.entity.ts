import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViewerRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  discoveryMethod: string;

  @ManyToOne(() => User, (user) => user.viewerRegistrations, { nullable: true })
  viewer: User;

  @ManyToOne(() => Event, (event) => event.viewerRegistrations)
  event: Event;
}
