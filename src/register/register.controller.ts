import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { UserInformationService, Information } from 'src/user-information/user-information.service';

@Controller('register')
export class RegisterController {
    constructor(private userInfoService: UserInformationService){}

    // This method registers a new user and returns OK if it was successful.
    // First it checks the username and password and then it adds them to the userpool.
    @Post('user')
    async registerUser(@Body() createUser: Information){

        createUser.role = 'User';

        if (! await this.userInfoService.addUser(createUser)) {
            throw new HttpException('Error when registering User', HttpStatus.BAD_REQUEST);
        }
        
        return HttpStatus.OK;
    }

    // This method registers a new admin and returns OK if it was successful.
    // First it checks the username and password and then it adds them to the userpool.
    @Post('admin')
    async registerAdmin(@Body() createUser: Information){

        createUser.role = 'Admin';

        if (! await this.userInfoService.addUser(createUser)) {
            throw new HttpException('Admin already created', HttpStatus.BAD_REQUEST);
        }

        return HttpStatus.OK;
    }
}
