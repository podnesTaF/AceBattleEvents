import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { BestResultsService } from 'src/modules/best-results/services/best-results.service';
import { RoleService } from 'src/modules/role/role.service';
import { StandardService } from 'src/modules/standard/standard.service';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
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

  // get runners with filters

  async getRunners({
    page = 1,
    limit = 10,
    search,
    teamId,
    countryId,
    genderId,
    categoryId,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    teamId?: number;
    countryId?: number;
    genderId?: number;
    categoryId?: number;
  }): Promise<Pagination<User>> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('role.name = :role', { role: 'runner' })
      .andWhere('userRoles.active = :active', { active: true })
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.gender', 'gender')
      .leftJoinAndSelect('user.category', 'category')
      .leftJoinAndSelect(
        'user.runnerTeams',
        'runnerTeam',
        'runnerTeam.active = :runnerTeamActive',
        { runnerTeamActive: true },
      )
      .leftJoinAndSelect('runnerTeam.team', 'team')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.genderId',
        'user.dateOfBirth',
        'user.imageName',
        'user.countryId',
        'user.city',
        'country',
        'runnerTeam',
        'team',
        'category',
        'gender',
      ]);

    if (countryId) {
      qb.andWhere('user.countryId = :countryId', {
        countryId,
      });
    }

    if (teamId) {
      qb.andWhere('team.id = :teamId', {
        teamId,
      });
    }

    if (genderId) {
      qb.andWhere('user.genderId = :genderId', {
        genderId,
      });
    }

    if (categoryId) {
      qb.andWhere('user.categoryId = :categoryId', {
        categoryId,
      });
    }

    if (search) {
      qb.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    return paginate<User>(qb, { page, limit });
  }

  // get runner profile info
  async getRunnerInfo(id: string): Promise<User> {
    const runner = await this.userRepository.findOne({
      where: { id: +id },
      relations: ['country', 'category', 'gender'],
      select: [
        'id',
        'firstName',
        'lastName',
        'dateOfBirth',
        'country',
        'category',
        'gender',
        'imageName',
        'avatarName',
      ],
    });

    return runner;
  }
}
