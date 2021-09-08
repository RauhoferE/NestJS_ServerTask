
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user-information/role.enum';
import { ROLES_KEY } from './role.decorator';
import * as jwt from 'jsonwebtoken'
import { UserInformationService } from 'src/user-information/user-information.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserInformationService) {}

  // This method checks the JSON webtoken for the username.
  // Then it gets the role of the user from the database and compares them to the metadata of the http argument.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as Request;
    let token = req.headers["authorization"] as string;
    let decToken = jwt.decode(token.substring(7)) as any;
    let usernameFromURL = req.url.split('/')[2];
    let user = await this.userService.returnInformation(decToken.username);
    if (user == null || usernameFromURL != user.nickname) {
      return false;
    }
    return requiredRoles.includes(user.role);
  }
}
