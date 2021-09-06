import { HttpException, HttpStatus, MiddlewareConsumer, Module, NestModule, Next } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserInformationService } from './user-information/user-information.service';
import { RegisterController } from './register/register.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    PassportModule,    
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  })
  ],
  controllers: [AppController, UserController, RegisterController],
  providers: [AppService, UserInformationService, AuthService, LocalStrategy],
  exports: [UserInformationService]
})
export class AppModule {}