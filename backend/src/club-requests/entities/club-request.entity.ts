import { Club } from 'src/club/entities/club.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JoinRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  motivation: string;

  @ManyToOne(() => User, (user) => user.joinRequests)
  user: User;

  @ManyToOne(() => Club, (club) => club.joinRequests)
  club: Club;
}
