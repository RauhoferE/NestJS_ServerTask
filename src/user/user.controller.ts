import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserInformationService, Information } from 'src/user-information/user-information.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export type InformationUpdater = {
    oldInfo: Information,
    newInfo: Information
}

@Controller('user')
export class UserController {
    constructor(private userInfoService: UserInformationService){}

    // This method returns the information of the user. 
    @Get(':id')
    async returnInformation(@Param('id') id:string): Promise<Information>{
        let info = await this.userInfoService.returnInformation(id); 

        if (info == null) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 

        console.log(info.name);
        return info;
    }

    //This method changes the information of the current user.
    @Post(':id')
    async changeInformation(@Param('id') id:string, @Body() informationUpdater: InformationUpdater){
        //console.log(createUser.name);
        // let info = <Information>{
        //     name : createUser.name,
        //     surname : createUser.surname, 
        //     age : createUser.age,
        //     email : createUser.email,
        //     role : 'User',
        //     pp: createUser.pp,
        //     password: createUser.password
        // };

        if (informationUpdater.newInfo.nickname == undefined || informationUpdater.newInfo.nickname.length < 8 
            || informationUpdater.newInfo.password == undefined || informationUpdater.newInfo.password.length < 8 || informationUpdater.newInfo.role != informationUpdater.oldInfo.role) {
            throw new HttpException('Cant update information', HttpStatus.BAD_REQUEST);
        }

        let result = await this.userInfoService.updateInformation(informationUpdater.oldInfo, informationUpdater.newInfo); 
        // console.log(info.name);

        if (result == false) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 

        return HttpStatus.OK;
    }

    // This method uploads a profile picture for the current user.
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
    async uploadProfilePicture(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
        let info = await this.userInfoService.returnInformation(id)

        if (!info) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        
        if (file != null) {
            let newFilePath = file.path + "1";
            await sharp(file.path)
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

            
            let newInfo = JSON.parse(JSON.stringify(info));
            newInfo.pp = newFilePath;
            await this.userInfoService.updateInformation(info, newInfo);
            return HttpStatus.OK;
        }
        
        throw new HttpException('Image does not have the correct format or is to big', HttpStatus.BAD_REQUEST);
    }
}
