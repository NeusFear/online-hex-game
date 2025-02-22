import {useState} from "react";
import {Player} from "@/app/data/player";
import {Colors} from "@/configs/colorConfigs";
import {Mascots} from "@/configs/mascotConfigs";

export default function Join({handleBack}: {handleBack: () => void}) {

    const [gameJoinCode, setGameJoinCode] = useState("")
    const [playerNameInput, setPlayerNameInput] = useState("")

    async function joinGame() {

        if (playerNameInput == "") return;
        if (gameJoinCode == "") return;

        try {
            const response = await fetch("/api/join_game", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameJoinCode: gameJoinCode,
                    player: new Player(playerNameInput, false, Colors.RED, Mascots.KING)
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to start game');
            } else {
                console.log("joined: " + data.players);
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    return(
        <>
            <button
                onClick={handleBack}
                className={"z-50 cursor-pointer bg-gray-800 text-lg p-2 font-bold text-white flex flex-row items-center justify-center absolute top-0 left-0 m-2 rounded-md"}>
                Go Back
            </button>
            <div className={"flex flex-col gap-2 w-1/2"}>
                <div className={"flex flex-row items-center justify-center w-full"}>
                    <p className={"bg-gray-800 text-white w-40 text-center py-6"}>Your Name</p>
                    <input required type="text"
                           onChange={(e) => setPlayerNameInput(e.target.value)}
                           value={playerNameInput}
                           className={`${playerNameInput == "" ? "bg-red-300" : "bg-white"} px-10 py-6 flex-grow`}
                           placeholder="Enter playername..."
                    />
                </div>
                <div className={"flex flex-row items-center justify-center w-full"}>
                    <p className={"bg-gray-800 text-white w-40 text-center py-6"}>Game Join Code</p>
                    <input required type="text"
                           onChange={(e) => setGameJoinCode(e.target.value)}
                           value={gameJoinCode}
                           className={`${gameJoinCode == "" ? "bg-red-300" : "bg-white"} px-10 py-6 flex-grow`}
                           placeholder="Enter game join code..."
                    />
                </div>
                <button className={"bg-gray-800 py-6 text-white font-semibold"} onClick={() => joinGame()}>
                    Join Game
                </button>
            </div>
        </>
    )
}