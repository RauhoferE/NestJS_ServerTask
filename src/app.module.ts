import { HttpException, HttpStatus, MiddlewareConsumer, Module, NestModule, Next } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserInformationService } from './user-information/user-information.service';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [
  ],
  controllers: [AppController, UserController, RegisterController],
  providers: [AppService, UserInformationService],
  exports: [UserInformationService]
})
export class AppModule {}