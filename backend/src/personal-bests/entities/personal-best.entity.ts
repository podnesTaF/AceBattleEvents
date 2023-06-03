import { PlayerEntity } from 'src/players/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalBestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column()
  timeInSeconds: number;

  @ManyToOne(() => PlayerEntity, (player) => player.personalBests)
  player: PlayerEntity;
}
