import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestResult } from 'src/modules/best-results/entities/best-result.entity';
import { BestResultsService } from 'src/modules/best-results/services/best-results.service';
import { Content } from 'src/modules/content/entities/content.entity';
import { CountryService } from 'src/modules/country/country.service';
import { Country } from 'src/modules/country/entity/country.entity';
import { FileService } from 'src/modules/file/file.service';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { GenderService } from 'src/modules/gender/gender.service';
import { OneTimeToken } from 'src/modules/ott/entities/ott.entity';
import { OneTimeTokenService } from 'src/modules/ott/ott.service';
import { PaymentsService } from 'src/modules/payments/payments.service';
import { Role } from 'src/modules/role/entities/role.entity';
import { RoleService } from 'src/modules/role/role.service';
import { Standard } from 'src/modules/standard/entities/standard.entity';
import { StandardService } from 'src/modules/standard/standard.service';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
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
      OneTimeToken,
      Gender,
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
    FileService,
    OneTimeTokenService,
    PaymentsService,
    GenderService,
  ],
  exports: [UserService],
})
export class UserModule {}
