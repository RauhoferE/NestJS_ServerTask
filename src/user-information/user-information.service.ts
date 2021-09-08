import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { use } from 'passport';
import { Role } from './role.enum';

// The class that holds the information about the user.
export type Information = {
    nickname: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    role: Role,
    pp: string,
    password: string
}

@Injectable()
export class UserInformationService {

    // The array that holds the user data.
    private readonly userInformation = [];

    // This method adds a user to the userpool and returns true if is successful.
    // If the username exists it returns false.
    async addUser(info: Information): Promise<boolean>{
        if (info == null || info.nickname == undefined || info.nickname.length < 8 || info.password == undefined || info.password.length < 8) {
            return false;
        }

        if (this.userInformation.find(user => user.nickname == info.nickname)) {
            return false;
        }

        this.userInformation.push(info);
        return true;
    }

    // This method deletes a user from the userpool and returns true if is successful.
    // If the username doesnt exist it returns false.
    async deleteUser(nickname: string): Promise<boolean>{
        let index_User = this.userInformation.indexOf(user => user.nickname == nickname);

        if (index_User == -1) {
            return false;
        }

        this.userInformation.splice(index_User, 1);
        return true;
    }

    // This method returns a user from the userpool.
    // If the username doesnt exist it returns false.
    async returnInformation(nickname: string): Promise<Information>{
        let user = this.userInformation.find(user => user.nickname == nickname);
        
        if (user == undefined) {
            return null
        }

        return user;
    }

    // This method updates a user's information from the userpool.
    // If the username doesnt exist it returns false.
    async updateInformation(oldInfo: Information, newinfo: Information): Promise<boolean>{

        if (oldInfo == null || newinfo == null) {
            return false;
        }
        let tt = oldInfo.nickname;
        let index_user = -1;
        this.userInformation.forEach(user => {
            let i = 0;
            if (user.nickname == tt) {
                index_user = i;
                return;
            }
            i++;
        });
        
        if (index_user == -1) {
            return false;
        }

        if (newinfo == null || newinfo.nickname == undefined || newinfo.nickname.length < 8 || newinfo.password == undefined || newinfo.password.length < 8 
            || newinfo.role != oldInfo.role) {
            return false;
        }

        this.userInformation.splice(index_user, 1);
        this.userInformation.push(newinfo);
    }
}
