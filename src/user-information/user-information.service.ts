import { Injectable } from '@nestjs/common';

// The class that holds the information about the user.
export type Information = {
    nickname: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    role: string,
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
        if (this.userInformation.find(user => user.nickName == info.nickname) || info == null) {
            return false;
        }

        this.userInformation.push(info);
        return true;
    }

    // This method deletes a user from the userpool and returns true if is successful.
    // If the username doesnt exist it returns false.
    async deleteUser(nickname: string): Promise<boolean>{
        let index_User = this.userInformation.indexOf(user => user.nickName == nickname);

        if (index_User == -1) {
            return false;
        }

        this.userInformation.splice(index_User, 1);
        return true;
    }

    // This method returns a user from the userpool.
    // If the username doesnt exist it returns false.
    async returnInformation(nickname: string): Promise<Information>{
        let user = this.userInformation.find(user => user.nickName == nickname);

        if (user == undefined) {
            return null;
        }

        return user;
    }

    // This method updates a user's information from the userpool.
    // If the username doesnt exist it returns false.
    async updateInformation(oldInfo: Information, newinfo: Information): Promise<boolean>{
        let index_user = this.userInformation.indexOf(user => user.nickName == oldInfo.nickname);

        if (index_user == -1 || newinfo == null) {
            return false;
        }

        this.userInformation.splice(index_user, 1);
        this.userInformation.push(newinfo);
    }
}
