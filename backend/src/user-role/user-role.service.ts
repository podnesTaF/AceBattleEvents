import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async createUserRole(body: CreateUserRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(body);

    try {
      return await this.userRoleRepository.save(userRole);
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
