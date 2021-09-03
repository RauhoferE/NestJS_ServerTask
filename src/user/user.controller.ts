import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { CreateUserInfo } from 'src/create-user-info';
import { Information } from 'src/information.interface';
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
        console.log(info.name);
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
    // TODO: Check if any parameter is empty and throw exeption
    @Post(':id')
    changeInformation(@Param('id') id:string, @Body() createUser: CreateUserInfo){
        console.log(createUser.name);
        let info = <Information>{
            name : createUser.name,
            surname : createUser.surname, 
            age : createUser.age,
            email : createUser.email,
            role : 'User',
            pp: createUser.pp,
            password: createUser.password
        };
        let result = this.userInfoService.updateInformation(id, info); 
        console.log(info.name);
        if (result == false) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 

        return HttpStatus.OK;
    }
}
