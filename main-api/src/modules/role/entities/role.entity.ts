import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  stripe_product_id: string;

  @Column({ nullable: true })
  stripe_price_id: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
