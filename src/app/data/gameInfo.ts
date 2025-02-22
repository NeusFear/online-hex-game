export class GameInfo {

    gameID: string;
    gameJoinCode: string;

    constructor(gameUUID: string, gameJoinCode: string) {
        this.gameID = gameUUID;
        this.gameJoinCode = gameJoinCode;
    }

}