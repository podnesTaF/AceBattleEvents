import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ahmo-chat',
    });
  }

  async validate(payload: { sub: number; email: string; roles: string[] }) {
    const data = {
      id: payload.sub,
      email: payload.email,
    };

    let user: any = null;
    if (payload.roles.includes('admin')) {
      user = await this.adminService.findByCond(data);
    } else {
      user = await this.userService.findByCond(data);
    }

    if (!user) {
      throw new UnauthorizedException("You don't have access to this page");
    }

    return {
      id: user.id,
      email: user.email,
      roles: payload.roles,
    };
  }
}
