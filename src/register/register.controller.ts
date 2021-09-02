import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { ppid } from 'process';
import { CreateUserInfo } from 'src/create-user-info';
import { Information } from 'src/information.interface';
import { UserInformationService } from 'src/user-information/user-information.service';

@Controller('register')
export class RegisterController {
    constructor(private userInfoService: UserInformationService){}
    @Post('user')
    registerUser(@Body() createUser: CreateUserInfo): CreateUserInfo{
        let info = <Information>{
            name : createUser.name,
            surname : createUser.surname,
            age : createUser.age,
            email : createUser.email,
            role : 'User',
            pp: createUser.pp
        };

        if (createUser.nickName == undefined || createUser.nickName.length < 8) {
            throw new HttpException('Username is not correct', HttpStatus.BAD_REQUEST);
        }

        if (!this.userInfoService.addUser(createUser.nickName, info)) {
            throw new HttpException('User already created', HttpStatus.BAD_REQUEST);
        }
        
        return <CreateUserInfo> {
            name : createUser.name,
            surname : createUser.surname,
            age : createUser.age,
            email : createUser.email,
            role : 'User',
            nickName : createUser.nickName,
            pp: createUser.pp
        };
        
    }

    @Post('admin')
    registerAdmin(@Body() createUser: CreateUserInfo): CreateUserInfo{
        let info = <Information>{
            name : createUser.name,
            surname : createUser.surname,
            age : createUser.age,
            email : createUser.email,
            role : 'Admin',
            pp: createUser.pp
        };

        if (!this.userInfoService.addUser(createUser.nickName, info)) {
            throw new HttpException('Admin already created', HttpStatus.BAD_REQUEST);
        }
        
        return <CreateUserInfo> {
            name : createUser.name,
            surname : createUser.surname,
            age : createUser.age,
            email : createUser.email,
            role : 'Admin',
            nickName : createUser.nickName,
            pp: createUser.pp
        };
    }
}
