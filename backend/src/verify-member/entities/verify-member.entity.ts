import { Member } from 'src/member/entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerifyMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, { nullable: true })
  member: Member;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @Column()
  token: string;

  @Column()
  expires: Date;
}