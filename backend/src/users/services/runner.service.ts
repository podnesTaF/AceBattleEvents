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
    private userRepository: Repository<User>,
    private readonly bestResultsService: BestResultsService,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
    protected readonly standardService: StandardService,
  ) {
    super(roleService, userRoleService);
  }

  async becomeRunner(userId: number, dto: BecomeRunnerDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    // assing user fields from dto to user

    user.dateOfBirth = new Date(dto.dateOfBirth);
    user.genderId = dto.genderId;
    user.avatarUrl = dto.avatarUrl;
    user.imageUrl = dto.imageUrl;
    user.countryId = dto.countryId;
    user.city = dto.city;

    // Creating bestResults

    const bestResults = await this.bestResultsService.createManyBestResults(
      dto.bestResults,
    );

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
