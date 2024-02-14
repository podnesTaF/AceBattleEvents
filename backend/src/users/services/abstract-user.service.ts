import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { Repository } from 'typeorm';
import { BecomeCoachDto } from '../dtos/become-coach.dto';
import { User } from '../entities/user.entity';

export abstract class AbstractUserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
  ) {}

  async createRoleForUser(userId: number, roleName: string) {
    const role = await this.roleService.findByName(roleName);
    const userRole = await this.userRoleService.createUserRole({
      roleId: role.id,
      userId,
    });
    return userRole;
  }

  async assignRequiredRoleFields(
    userId: number,
    dto: BecomeCoachDto,
    role?: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles.role'],
    });

    if (
      user.roles &&
      user.roles.some((userRole) => userRole.role.name === role)
    ) {
      throw new BadRequestException('User already has this role');
    }

    user.dateOfBirth = new Date(dto.dateOfBirth);
    user.genderId = dto.genderId;
    user.avatarUrl = dto.avatarUrl;
    user.imageUrl = dto.imageUrl;
    user.countryId = dto.countryId;
    user.city = dto.city;
    user.phoneNumber = dto.phoneNumber;

    return user;
  }
}
