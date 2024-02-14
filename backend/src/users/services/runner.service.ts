import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BestResultsService } from 'src/best-results/services/best-results.service';
import { RoleService } from 'src/role/role.service';
import { StandardService } from 'src/standard/standard.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { Repository } from 'typeorm';
import { BecomeRunnerDto } from '../dtos/become-runner.dto';
import { User } from '../entities/user.entity';
import { AbstractUserService } from './abstract-user.service';

@Injectable()
export class RunnerService extends AbstractUserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly userRoleService: UserRoleService,
    protected readonly standardService: StandardService,
    private readonly bestResultsService: BestResultsService,
    protected readonly roleService: RoleService,
  ) {
    super(userRepository, roleService, userRoleService);
  }

  async becomeRunner(userId: number, dto: BecomeRunnerDto): Promise<User> {
    // assing user fields from dto to user
    const user = await this.assignRequiredRoleFields(userId, dto, 'runner');

    // Creating bestResults

    const bestResults = await this.bestResultsService.createManyBestResults([
      ...dto.bestResults.map((result) => ({ ...result, runnerId: userId })),
    ]);

    user.bestResults = bestResults;

    // Creating userRole

    const userRole = await this.createRoleForUser(user.id, 'runner');

    user.roles = user.roles ? [...user.roles, userRole] : [userRole];

    // Define Category based on bestResults and standard for gender and distance
    const { category } = await this.standardService.findHighestRankingStandard(
      user.bestResults,
      user.genderId,
    );

    user.category = category;

    // Save user

    return this.userRepository.save(user);
  }
}
