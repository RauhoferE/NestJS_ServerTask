
import { Module } from '@nestjs/common';
import { UserInformationService } from 'src/user-information/user-information.service';

@Module({
  providers: [UserInformationService],
  exports: [UserInformationService],
})
export class UsersModule {}
