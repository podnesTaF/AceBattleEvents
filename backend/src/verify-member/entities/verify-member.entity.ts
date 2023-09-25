import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerifyMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member)
  member: Member;

  @Column()
  token: string;

  @Column()
  expires: Date;
}
