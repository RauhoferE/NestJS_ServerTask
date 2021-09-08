import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserInformationService, Information } from 'src/user-information/user-information.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user-information/role.enum';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserNameGuard } from 'src/auth/username.guard';

// This type is for updating the old information of the user.
// This is mainly used in the post method of ID.
export type InformationUpdater = {
    oldInfo: Information,
    newInfo: Information
}

@Controller('user')
export class UserController {
    constructor(private userInfoService: UserInformationService){}

    // This method returns the information of the user. 
    @UseGuards(JwtAuthGuard, UserNameGuard)
    @Get(':id')
    async returnInformation(@Param('id') id:string): Promise<Information>{
        let info = await this.userInfoService.returnInformation(id); 

        if (info == null) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 

        return info;
    }

    //This method changes the information of the current user.
    @UseGuards(JwtAuthGuard, UserNameGuard)
    @Post(':id')
    async changeInformation(@Param('id') id:string, @Body() informationUpdater: InformationUpdater){

        if (informationUpdater == null || informationUpdater.oldInfo == undefined || informationUpdater.newInfo == undefined) {
            throw new HttpException('Cant update information', HttpStatus.BAD_REQUEST);
        }

        let result = await this.userInfoService.updateInformation(informationUpdater.oldInfo, informationUpdater.newInfo); 
        

        if (result == false) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        } 

        return HttpStatus.OK;
    }

    // This method uploads a profile picture for the current user if the user has the role of admin.
    @UseGuards(JwtAuthGuard, UserNameGuard, RolesGuard)
    @Roles(Role.Admin)
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
                if (info.pp != undefined) {
                    fs.unlink(info.pp, err => {
                        if (err) {
                            console.log("Couldn't delete file.");
                            console.log(err);    
                        }
                    });
                }

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

    // This method returns the currently used profile picture of the user.
    @UseGuards(JwtAuthGuard, UserNameGuard, RolesGuard)
    @Get(':id/profilePic')
    async getProfilePicture(@Param('id') id:string) : Promise<StreamableFile>{

        let info = await this.userInfoService.returnInformation(id);
        if (!info) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }

        if (info.pp == undefined) {
            throw new HttpException('No profile picture found', HttpStatus.BAD_REQUEST);
        }

        const file = fs.createReadStream(info.pp);
        return new StreamableFile(file);
    }

}
