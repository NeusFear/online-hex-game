export class Player {

    userName: string;
    isHost: boolean;

    constructor(userName: string, isHost: boolean) {
        this.userName = userName;
        this.isHost = isHost;
    }

}