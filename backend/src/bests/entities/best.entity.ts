import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Best {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distanceInCm: number;

  @Column()
  timeInMs: number;

  @ManyToOne(() => Member, (member) => member.personalBests, {
    onDelete: 'CASCADE',
  })
  memberPb: Member;

  @ManyToOne(() => Member, (member) => member.seasonBests, {
    onDelete: 'CASCADE',
  })
  memberSb: Member;
}
