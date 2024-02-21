import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/modules/role/role.service';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
import { Repository } from 'typeorm';
import { BecomeCoachDto } from '../dtos/become-coach.dto';
import { User } from '../entities/user.entity';
import { AbstractUserService } from './abstract-user.service';

@Injectable()
export class CoachService extends AbstractUserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
  ) {
    super(userRepository, roleService, userRoleService);
  }

  async becomeCoach(userId: number, dto: BecomeCoachDto): Promise<User> {
    // assing user fields from dto to user
    const user = await this.assignRequiredRoleFields(userId, dto, 'coach');

    // Creating userRole for coach

    const userRole = await this.createRoleForUser(user.id, 'coach');

    user.roles = user.roles ? [...user.roles, userRole] : [userRole];

    // Save user

    return this.userRepository.save(user);
  }
}
