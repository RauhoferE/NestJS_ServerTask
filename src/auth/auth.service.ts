import { Injectable } from '@nestjs/common';
import { UserInformationService } from 'src/user-information/user-information.service';
import { JwtService } from '@nestjs/jwt';

// This service handles the authentication and the creation of the jwt token.
@Injectable()
export class AuthService {
    constructor(private usersService: UserInformationService,
      private jwtService: JwtService
      ) {}

    // This method validates the username and the password with the credentials stored in the user service.
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.returnInformation(username);
      if (user == null) {
        return null;
      }

      if (user && user.password === pass) {

        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    // This methods saves the username in the jwt token.
    async login(user){
      const payload = { username: user.nickname};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
