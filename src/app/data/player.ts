import {Color} from "@/app/data/color";
import {Mascot} from "@/app/data/mascot";

export class Player {

    userName: string;
    isHost: boolean;
    color: Color;
    mascot: Mascot;

    constructor(userName: string, isHost: boolean, color: Color, mascot: Mascot) {
        this.userName = userName;
        this.isHost = isHost;
        this.color = color;
        this.mascot = mascot;
    }

}