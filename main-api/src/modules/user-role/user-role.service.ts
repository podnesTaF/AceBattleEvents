import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserRoleDto,
  CreateUserRoleSubscription,
} from './dto/create-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async createUserRole(
    body: CreateUserRoleDto | CreateUserRoleSubscription,
  ): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(body);

    try {
      const ur = await this.userRoleRepository.save(userRole);
      const populatedUserRole = await this.userRoleRepository.findOne({
        where: { id: ur.id },
        relations: ['role'],
      });

      return populatedUserRole;
    } catch (error) {
      if (
        error.code === 'ER_DUP_ENTRY' ||
        error.message.includes('Duplicate entry')
      ) {
        throw new ConflictException(`The user already has the specified role.`);
      }
      throw error;
    }
  }
}
