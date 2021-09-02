import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CreateUserInfo } from 'src/create-user-info';
import { UserInformationService } from 'src/user-information/user-information.service';

@Controller('user')
export class UserController {
    constructor(private userInfoService: UserInformationService){}

    @Get(':id')
    returnInformation(@Param('id') id:string): CreateUserInfo{
        let info = this.userInfoService.returnInformation(id); 
        if (info == null) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        return <CreateUserInfo> {
            nickName: id,
            name: info.name,
            age: info.age,
            surname: info.surname,
            email: info.email,
            role: info.role,
            pp: info.pp

        };
    }

    
}
