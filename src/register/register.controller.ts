import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { UserInformationService, Information } from 'src/user-information/user-information.service';

@Controller('register')
export class RegisterController {
    constructor(private userInfoService: UserInformationService){}

    // This method registers a new user and returns OK if it was successful.
    // First it checks the username and password and then it adds them to the userpool.
    @Post('user')
    async registerUser(@Body() createUser: Information){
        // let info = <Information>{
        //     name : createUser.name,
        //     surname : createUser.surname, 
        //     age : createUser.age,
        //     email : createUser.email,
        //     role : 'User',
        //     pp: createUser.pp,
        //     password: createUser.password
        // };
        createUser.role = 'User';

        if (createUser.nickname == undefined || createUser.nickname.length < 8 || createUser.password == undefined || createUser.password.length < 8) {
            throw new HttpException('You must put in a username and password', HttpStatus.BAD_REQUEST);
        }

        if (! await this.userInfoService.addUser(createUser)) {
            throw new HttpException('User already created', HttpStatus.BAD_REQUEST);
        }
        
        // return <CreateUserInfo> {
        //     name : createUser.name,
        //     surname : createUser.surname,
        //     age : createUser.age,
        //     email : createUser.email,
        //     role : 'User',
        //     nickName : createUser.nickName,
        //     pp: createUser.pp
        // };
        
        return HttpStatus.OK;
    }

    // This method registers a new admin and returns OK if it was successful.
    // First it checks the username and password and then it adds them to the userpool.
    @Post('admin')
    async registerAdmin(@Body() createUser: Information){
        // let info = <Information>{
        //     name : createUser.name,
        //     surname : createUser.surname,
        //     age : createUser.age,
        //     email : createUser.email,
        //     role : 'Admin',
        //     pp: createUser.pp,
        //     password: createUser.password
        // };

        createUser.role = 'Admin';

        if (createUser.nickname == undefined || createUser.nickname.length < 8 || createUser.password == undefined || createUser.password.length < 8) {
            throw new HttpException('You must put in a username and password', HttpStatus.BAD_REQUEST);
        }

        if (! await this.userInfoService.addUser(createUser)) {
            throw new HttpException('Admin already created', HttpStatus.BAD_REQUEST);
        }
        
        // return <CreateUserInfo> {
        //     name : createUser.name,
        //     surname : createUser.surname,
        //     age : createUser.age,
        //     email : createUser.email,
        //     role : 'Admin',
        //     nickName : createUser.nickName,
        //     pp: createUser.pp
        // };

        return HttpStatus.OK;
    }
}
