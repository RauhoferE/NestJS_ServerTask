import { Injectable } from '@nestjs/common';
import { UserInformationService } from 'src/user-information/user-information.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserInformationService,
      private jwtService: JwtService
      ) {}

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

    async login(user){
      const payload = { username: user.username, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
