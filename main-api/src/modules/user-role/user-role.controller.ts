import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';

@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  assignRole(@Body() dto: CreateUserRoleDto) {
    return this.userRoleService.createUserRole(dto);
  }
}
