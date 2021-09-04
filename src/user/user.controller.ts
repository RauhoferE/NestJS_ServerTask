import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserInfo } from 'src/create-user-info';
import { Information } from 'src/information.interface';
import { UserInformationService } from 'src/user-information/user-information.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

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
    @UseInterceptors(FileInterceptor('file', {
        dest: './files',
        fileFilter : (req, file, cb)  => {
          if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'File has wrong format';
            return cb(null, false);
           }
  
          if (file.size > 500000) {
            req.fileValidationError = 'File too large';
            return cb(null, false);
          }
           cb(null, true);
        }})
        )
    uploadProfilePicture(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
        let info = this.userInfoService.returnInformation(id)

        if (!info) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        if (file != null) {
            let newFilePath = file.path + "1";
            sharp(file.path)
            .resize(200,200)
            .png({quality: 90})
            .toFile(newFilePath)
            .then(() => {
                fs.unlink(file.path, err => {
                    if (err) {
                        console.log("Couldn't delete file.");
                        console.log(err);    
                    }
                });
            })
            .catch(err => {
                if (err) {
                    console.log(err);    
                }
            });

            info.pp = newFilePath;
            this.userInfoService.updateInformation(id, info);
            return HttpStatus.OK;
        }
        
        throw new HttpException('Image does not have the correct format or is to big', HttpStatus.BAD_REQUEST);
    }
}
