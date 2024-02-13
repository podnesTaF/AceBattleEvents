import { RoleService } from 'src/role/role.service';
import { UserRoleService } from 'src/user-role/user-role.service';

export abstract class AbstractUserService {
  constructor(
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
  ) {}

  async createRoleForUser(userId: number, roleName: string) {
    const role = await this.roleService.findByName(roleName);
    const userRole = await this.userRoleService.createUserRole({
      roleId: role.id,
      userId,
    });
    return userRole;
  }
}
