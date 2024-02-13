import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/content/entities/content.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { UserRoleService } from 'src/user-role/user-role.service';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Country, Content, Role, UserRole])],
  controllers: [UserController],
  providers: [
    UserService,
    CountryService,
    JwtService,
    RoleService,
    UserRoleService,
  ],
  exports: [UserService],
})
export class UserModule {}
