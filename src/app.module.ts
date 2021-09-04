import { HttpException, HttpStatus, MiddlewareConsumer, Module, NestModule, Next } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserInformationService } from './user-information/user-information.service';
import { RegisterController } from './register/register.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './files',
    //   fileFilter : (req, file, cb)  => {
    //     if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    //       req.fileValidationError = 'File has wrong format';
    //       return cb(null, false);
    //      }

    //     if (file.size > 500000) {
    //       req.fileValidationError = 'File too large';
    //       return cb(null, false);
    //     }
    //      cb(null, true);
    //   }
    // })
  ],
  controllers: [AppController, UserController, RegisterController],
  providers: [AppService, UserInformationService],
})
export class AppModule {}