"use client"
import {useEffect, useState} from "react";
import {HexInfo} from "@/app/data/hexInfo";
import {NUM_HEXES, NUM_ROWS, OCEAN_COLOR} from "@/configs/mapConfig";
import HexGrid from "@/components/HexGrid";
import {createNoise2D} from "simplex-noise";
import alea from "alea";
import {v4 as uuid} from "uuid";
import {Player} from "@/app/data/player";
import {Mascots} from "@/configs/mascotConfigs";
import {Mascot} from "../data/mascot";
import {Color} from "@/app/data/color";
import {Colors} from "@/configs/colorConfigs";
import {useRouter} from "next/navigation";

export default function Host() {

    const router = useRouter();

    const [hexes, setHexes] = useState<HexInfo[]>([])
    const [seed, setSeed] = useState(Math.random())
    const [queueOpen, setQueueOpen] = useState(false)
    const [gameUUID, setGameUUID] = useState<string>()
    const [gameJoinCode, setGameJoinCode] = useState("")
    const [playerNameInput, setPlayerNameInput] = useState("")

    function regenerateMap() {

        setSeed(Math.random())

        setHexes(Array.from({ length: NUM_HEXES })
            .map((_, i) => (
                    new HexInfo(
                        i + 1,
                        {
                            x: (i % (NUM_ROWS * 2)) / 2,
                            y: Math.round(i / (NUM_ROWS * 2) - 0.5) * 2 + (i % 2 == 0 ? 1 : 0)
                        },
                        createNoise2D(alea(seed))
                    )
                )
            ))
    }

    async function openQueue() {

        if (playerNameInput == "") return;

        try {
            const response = await fetch("/api/open_queue", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    host: new Player(playerNameInput, true, Colors.RED, Mascots.KING),
                    gameUUID: gameUUID
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setQueueOpen(true)
                setGameJoinCode(data.gameJoinCode)
            } else {
                throw new Error('Failed to start game');
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    async function cancel() {

        const newData = { gameUUID: gameUUID };

        try {
            const response = await fetch("/api/close_game", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                setQueueOpen(false)
            } else {
                throw new Error('Failed to close game');
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    async function goBack() {
        await cancel();
        router.push("/");
    }

    useEffect(() => {
        regenerateMap()
        setGameUUID(uuid())
    }, []);

    return (
        <div className={`w-screen h-screen ${OCEAN_COLOR}`} >
            <div className="scale-[35%] transform -translate-y-1/4 absolute top-0 left-1/2 -translate-x-1/2">
                <div className="transform -translate-x-36">
                    <HexGrid hexes={hexes} />
                </div>
            </div>
            <button
                onClick={() => goBack()}
                className={"z-50 cursor-pointer bg-gray-800 text-lg p-2 font-bold text-white flex flex-row items-center justify-center absolute top-0 left-0 m-2 rounded-md"}>
                Go Back
            </button>
            {!queueOpen ?
                <div className={"absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 flex flex-row items-center justify-center w-full"}>
                    <p className={"bg-gray-800 text-white px-10 py-6"}>Your Name</p>
                    <input required type="text"
                           onChange={(e) => setPlayerNameInput(e.target.value)}
                           value={playerNameInput}
                           className={`${playerNameInput == "" ? "bg-red-300" : "bg-white"} px-10 py-6`}
                           placeholder="Enter playername..."
                    />
                </div>
                :
                <div className={"absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 flex flex-col items-center justify-center w-64 text-center"}>
                    <p className={"bg-gray-800 text-white py-1 font-semibold w-full"}>Invite Players to Join</p>
                    <p className={"bg-white text-gray-800 px-10 py-2 font-bold text-4xl w-full"}>{gameJoinCode}</p>
                </div>
            }
            <div className={"absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 flex flex-row items-center justify-center w-full gap-2"}>
                {queueOpen || <GameButton onClick={regenerateMap} buttonText="Regenerate" />}
                {!queueOpen ? <GameButton enabled={playerNameInput != ""} onClick={openQueue} buttonText="Use Map & Open Queue"/> :
                    <GameButton onClick={cancel} buttonText="Cancel"/>}
            </div>
            {queueOpen &&
                <div className={"absolute top-0 left-0 mt-12"}>
                    <UserDisplay name="Johnny Dozer" color={Colors.RED} mascot={Mascots.BISHOP} host={true} />
                    <UserDisplay name="Ricky Cook" color={Colors.BLUE} mascot={Mascots.CLUB} host={false} />
                    <UserDisplay name="Garrett Arranda" color={Colors.GREEN} mascot={Mascots.KNIGHT} host={false} />
                    <UserDisplay name="Brandon Davis" color={Colors.RED} mascot={Mascots.CAMPFIRE} host={false} />
                    <UserDisplay name="NeusFear" color={Colors.PURPLE} mascot={Mascots.SKULL} host={false} />
                    <UserDisplay name="Kaden Stinkypants" color={Colors.YELLOW} mascot={Mascots.ROOK} host={false} />
                </div>
            }
        </div>
    );
}

function GameButton({ onClick, buttonText, enabled = true }: { onClick: () => void, buttonText: string, enabled?: boolean }) {
    return(
        <div className={`bg-white px-10 py-6 ${enabled ? "cursor-pointer" : "cursor-not-allowed"}`}
             onClick={() => onClick()}>
            {buttonText}
        </div>
    )
}

function UserDisplay({name, color, mascot, host}: {name: string, color: Color, mascot: Mascot, host: boolean}) {
    return(
        <div className={"flex flex-row m-4"}>
            <div className={`${color.color} h-16 w-16 rounded-full mr-2 shadow-2xl`}>
                <div className={"w-full h-full"}
                style={{
                    backgroundImage: "url(mascot_icons/" + mascot.icon + ".png)",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "60%",
                    backgroundRepeat: "no-repeat",
                }}>
                </div>
            </div>
            <div className={"flex flex-col shadow-2xl"}>
                <div className={"bg-white px-3 w-64"}>
                    <p className={"font-bold text-lg"}>{name}</p>
                    <p className={"font-semibold text-xs text-slate-500 transform -translate-y-2"}>{host ? "Host" : "Player"}</p>
                </div>
                <p className={"text-xs pl-2 bg-gray-800 text-white font-semibold py-0.5 capitalize"}>{color.name} {mascot.name} Kingdom</p>
            </div>
        </div>
    )
}