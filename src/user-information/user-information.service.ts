import { Injectable } from '@nestjs/common';
import { Information } from 'src/information.interface';

@Injectable()
export class UserInformationService {
    // The map uses nickname: Information as a Key-Value pair.
    private userInformation = new Map();

    addUser(nickname: string, info: Information): boolean{
        if (this.userInformation.has(nickname) || info == null) {
            return false;
        }

        this.userInformation.set(nickname, info);
        return true;
    }

    deleteUser(nickname: string): boolean{
        if (!this.userInformation.has(nickname)) {
            return false;
        }

        this.userInformation.delete(nickname);
        return true;
    }

    returnInformation(nickname: string): Information{
        if (!this.userInformation.has(nickname)) {
            return null;
        }

        return this.userInformation.get(nickname);
    }

    updateInformation(nickname: string, info: Information): boolean{
        if (!this.userInformation.has(nickname) || info == null) {
            return false;
        }

        this.userInformation.set(nickname, info);
    }

    updateNickName(newNickname: string, oldNickname: string, info:Information): boolean{
        if (!this.userInformation.has(oldNickname) || info == null) {
            return false;
        }

        this.userInformation.delete(oldNickname);
        this.userInformation.set(newNickname, info);
        return true;
    }
}
