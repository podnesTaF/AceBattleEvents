import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrizeCategory } from "./prize-category";

@Entity()
export class PrizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: string;

  @Column()
  amount: number;

  @ManyToOne(() => PrizeCategory, (category) => category.prizes, {
    onDelete: "CASCADE",
  })
  category: PrizeCategory;
}
