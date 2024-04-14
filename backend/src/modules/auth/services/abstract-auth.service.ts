import { JwtService } from '@nestjs/jwt';
import { OneTimeTokenService } from 'src/modules/ott/ott.service';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { RequestRole } from 'src/modules/users/decorators/user.decorator';
import { User } from 'src/modules/users/entities/user.entity';

export abstract class AbstractAuthService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly oneTimeTokenService: OneTimeTokenService,
  ) {}

  async login(user: Partial<User>) {
    const roles = this.getRoles(user.roles);

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      roles,
    };

    const jwtToken = this.generateJwtToken(payload);

    const ott = await this.oneTimeTokenService.createToken(
      user as User,
      jwtToken,
    );

    return {
      ...payload,
      token: jwtToken,
      ott: ott,
    };
  }

  generateJwtToken(data: {
    id: number;
    email: string;
    roles: RequestRole[];
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }) {
    return this.jwtService.sign(data);
  }

  getRoles(roles: UserRole[]) {
    return roles.map((userRole) => ({
      id: userRole.role.id,
      name: userRole.role.name,
      active: userRole.startDate < new Date() && userRole.endDate > new Date(),
    }));
  }
}
