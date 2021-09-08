import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { UserInformationService } from 'src/user-information/user-information.service';

@Injectable()
export class UserNameGuard implements CanActivate {
  constructor(private userService: UserInformationService) {}

  // This guard checks if the user is valid for accessing the url.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    let token = req.headers["authorization"] as string;
    let decToken = jwt.decode(token.substring(7)) as any;
    let usernameFromURL = req.url.split('/')[2];
    let user = await this.userService.returnInformation(decToken.username);
    if (user == null || usernameFromURL != user.nickname) {
      return false;
    }

    return true;
  }
}