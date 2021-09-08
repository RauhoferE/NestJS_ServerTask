
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user-information/role.enum';
import { ROLES_KEY } from './role.decorator';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // This method checks the JSON webtoken for the role of the user and compares them to the metadata of the http argument.
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    let token = req.headers["authorization"] as string;
    let decToken = jwt.decode(token.substring(7)) as any;

    return requiredRoles.includes(decToken.role);
  }
}
