import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, parse } from 'date-fns';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { BestResultsService } from 'src/modules/best-results/services/best-results.service';
import { GenderService } from 'src/modules/gender/gender.service';
import { RoleService } from 'src/modules/role/role.service';
import { StandardService } from 'src/modules/standard/standard.service';
import { TeamPlayer } from 'src/modules/team/entities/team-player.entity';
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
    protected readonly gerderService: GenderService,
  ) {
    super(userRepository, roleService, userRoleService);
  }

  async becomeRunner(userId: number, dto: BecomeRunnerDto): Promise<User> {
    // assing user fields from dto to user
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // Assigning user fields from dto to user
    const parsedDate = parse(dto.dateOfBirth, 'dd/MM/yyyy', new Date());

    const formattedDate = format(parsedDate, 'yyyy-MM-dd');

    user.dateOfBirth = formattedDate;
    user.genderId = +dto.genderId;

    // Creating bestResults

    const bestResults = await this.bestResultsService.createManyBestResults([
      ...dto.bestResults.map((result) => ({ ...result, runnerId: userId })),
    ]);

    user.bestResults = bestResults;

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
      .andWhere(':now BETWEEN userRoles.startDate AND userRoles.endDate', {
        now: new Date(),
      })
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
        'user.imageUrl',
        'user.avatarUrl',
        'user.countryId',
        'user.city',
        'country',
        'runnerTeam',
        'team',
        'category',
        'gender',
      ])
      .orderBy('user.rank', 'ASC');

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

  async getTopRunners({
    count,
    genderName,
  }: {
    count: number;
    genderName?: string;
  }): Promise<{
    male: User[] | null;
    female: User[] | null;
  }> {
    const gender = await this.gerderService.findByCond({ name: genderName });

    const returnData = {
      male: null,
      female: null,
    };
    if (!genderName) {
      returnData['male'] = await this.getTopRunnersByGender(count, 1);
      returnData['female'] = await this.getTopRunnersByGender(count, 2);
    } else {
      returnData[gender.name] = await this.getTopRunnersByGender(
        count,
        gender.id,
      );
    }

    return returnData;
  }

  async getTopRunnersByGender(count: number, genderId: number) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.runnerTeams', 'runnerTeams')
      .leftJoinAndSelect('runnerTeams.team', 'team')
      .where('user.genderId = :genderId', { genderId })
      .orderBy('user.rank', 'ASC')
      .take(count);

    return qb.getMany();
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
        'avatarUrl',
        'imageUrl',
      ],
    });

    return runner;
  }

  async getRunnerTeams(runnerId: number): Promise<TeamPlayer[]> {
    const runner = await this.userRepository.findOne({
      where: { id: runnerId },
      relations: [
        'runnerTeams',
        'runnerTeams.team',
        'runnerTeams.team.country',
        'runnerTeams.team.coach',
        'runnerTeams.team.teamRunners',
        'runnerTeams.team.teamRunners.runner',
      ],
    });

    return runner.runnerTeams;
  }
}
