import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
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

    const user = await this.userService.findByCond(data);

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
