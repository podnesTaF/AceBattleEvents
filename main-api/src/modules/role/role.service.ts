import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(body: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(body);
    return await this.roleRepository.save(role);
  }

  async findByCond(cond: { [key: string]: any }): Promise<Role> {
    console.log(cond);
    return await this.roleRepository.findOne({ where: cond });
  }

  async getRoles({ type }): Promise<Role[]> {
    if (type === 'product') {
      return await this.roleRepository.find({
        where: { stripe_product_id: Not(null) && Not('') },
      });
    }
    return await this.roleRepository.find();
  }

  async updateRoleWithStripeProductId(
    roleId: number,
    stripeProductId: string,
  ): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new Error('Role not found');
    }
    role.stripe_product_id = stripeProductId;
    await this.roleRepository.save(role);
  }
}
