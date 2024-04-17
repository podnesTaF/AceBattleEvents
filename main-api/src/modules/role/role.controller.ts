import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@ApiTags('users', 'roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createRole(@Body() body: CreateRoleDto) {
    return this.roleService.createRole(body);
  }

  @Get()
  getRoles(@Query('type') type?: string) {
    return this.roleService.getRoles({ type });
  }

  @Patch('update-stripe-product-id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateRoleWithStripeProductId(
    @Body() body: { roleId: number; stripeProductId: string },
  ) {
    return this.roleService.updateRoleWithStripeProductId(
      body.roleId,
      body.stripeProductId,
    );
  }
}
