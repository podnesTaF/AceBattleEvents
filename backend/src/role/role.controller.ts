import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  createRole(@Body() body: CreateRoleDto) {
    return this.roleService.createRole(body);
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }
}
