import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { ROLES_KEY } from '../roles/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'The user is not authorized',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(
        (userRole: UserRole) =>
          requiredRoles.includes(userRole.role.name) && userRole.active,
      );
    } catch (e) {
      console.log(e);
      throw new HttpException('No access rights', HttpStatus.FORBIDDEN);
    }
  }
}
