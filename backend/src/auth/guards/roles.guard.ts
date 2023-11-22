import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles specified, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you store user information in the request
    if (!user || !user.roles) {
      return false; // User is not authenticated or does not have any roles
    }

    if (roles.includes(UserRole.ADMIN) && user.roles.includes(UserRole.ADMIN)) {
      return true; // Allow access for admins
    }

    return roles.some((role) => user.roles.includes(role));
  }
}