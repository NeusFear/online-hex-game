import {v4 as uuid} from "uuid";

export class GameInfo {

    gameID: string;
    gameJoinCode: string;

    constructor(gameJoinCode: string) {
        this.gameID = uuid();
        this.gameJoinCode = gameJoinCode;
    }

}