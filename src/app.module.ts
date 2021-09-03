import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserInformationService } from './user-information/user-information.service';
import { RegisterController } from './register/register.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
      fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
          return cb(new Error('Only pngs and jpegs are allowed'), false);
        }
    
        cb(null, true);
      }
    })
  ],
  controllers: [AppController, UserController, RegisterController],
  providers: [AppService, UserInformationService],
})
export class AppModule {}
