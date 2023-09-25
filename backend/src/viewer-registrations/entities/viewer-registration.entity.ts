import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { Member } from 'src/member/entities/member.entity';
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

  @Column({ nullable: true })
  gender: string;

  @ManyToOne(() => Member, (member) => member.viewerRegistrations, {
    nullable: true,
  })
  viewer: Member;

  @ManyToOne(() => Event, (event) => event.viewerRegistrations)
  event: Event;

  @ManyToOne(() => Media, { nullable: true, onDelete: 'SET NULL' })
  qrcode: Media;

  @ManyToOne(() => Media, { nullable: true, onDelete: 'SET NULL' })
  ticket: Media;
}
