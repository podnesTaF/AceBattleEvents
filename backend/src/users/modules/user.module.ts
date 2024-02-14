import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestResult } from 'src/best-results/entities/best-result.entity';
import { BestResultsService } from 'src/best-results/services/best-results.service';
import { Content } from 'src/content/entities/content.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { Standard } from 'src/standard/entities/standard.entity';
import { StandardService } from 'src/standard/standard.service';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { UserRoleService } from 'src/user-role/user-role.service';
import { CoachController } from '../controllers/coach.controller';
import { RunnerController } from '../controllers/runner.controller';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { CoachService } from '../services/coach.service';
import { RunnerService } from '../services/runner.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Country,
      Content,
      Role,
      UserRole,
      BestResult,
      Standard,
    ]),
  ],
  controllers: [UserController, RunnerController, CoachController],
  providers: [
    UserService,
    CountryService,
    RoleService,
    UserRoleService,
    BestResultsService,
    RunnerService,
    StandardService,
    CoachService,
  ],
  exports: [UserService],
})
export class UserModule {}
