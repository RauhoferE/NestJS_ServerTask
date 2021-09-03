import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserInfo } from 'src/create-user-info';
import { Information } from 'src/information.interface';
import { UserInformationService } from 'src/user-information/user-information.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';

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

    @Post(':id/profilePic')
    @UseInterceptors(FileInterceptor('file'))
    uploadProfilePicture(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
        
        if (file.mimetype == 'image/png') {
            sharp(file.path).resize(200,200).png({quality: 90}).toFile(file.path);
            let info = this.userInfoService.returnInformation(id);
            info.pp = file.path;
            this.userInfoService.updateInformation(id, info);
        }else{

        }
        
        
    }
}
