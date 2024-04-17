import { Team } from 'src/modules/team/entities/team.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JoinRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  message: string;

  @Column()
  teamId: number;
  @ManyToOne(() => Team, (team) => team.joinRequests, { onDelete: 'CASCADE' })
  team: Team;

  @Column()
  runnerId: number;
  @ManyToOne(() => User, (runner) => runner.joinRequests, {
    onDelete: 'CASCADE',
  })
  runner: User;

  @Column()
  initiatorId: number;
  @ManyToOne(() => User)
  initiator: User;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  statusChangedAt: Date;

  @Column({
    type: 'datetime',
  })
  expiresAt: Date;
}
