
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserController } from 'src/user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserInformationService } from 'src/user-information/user-information.service';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [UsersModule, PassportModule,    
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),],
  providers: [AuthService, LocalStrategy, ],
  exports: [AuthService]
})
export class AuthModule {}
