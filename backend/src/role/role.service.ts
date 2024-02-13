import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
