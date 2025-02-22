"use client"
import {useEffect, useState} from "react";
import {HexInfo} from "@/app/data/hexInfo";
import {NUM_HEXES, NUM_ROWS, OCEAN_COLOR} from "@/configs/mapConfig";
import HexGrid from "@/components/HexGrid";
import {createNoise2D} from "simplex-noise";
import alea from "alea";
import {v4 as uuid} from "uuid";
import {Player} from "@/app/data/player";

export default function Host() {

    const [hexes, setHexes] = useState<HexInfo[]>([])
    const [seed, setSeed] = useState(Math.random())
    const [queueOpen, setQueueOpen] = useState(false)
    const [gameUUID, setGameUUID] = useState<string>()
    const [player, setPlayer] = useState(new Player("placeholderName", true))

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

        const newData = { host: player, gameUUID: gameUUID };

        try {
            const response = await fetch("/api/create_user_collection", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                setQueueOpen(true)
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
            <div className={"absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 flex flex-row items-center justify-center w-full"}>
                <GameButton onClick={regenerateMap} buttonText="Regenerate" />
                {queueOpen ? <GameButton onClick={cancel} buttonText="Cancel" /> : <GameButton onClick={openQueue} buttonText="Open Queue" />}
            </div>
        </div>
    );
}

function GameButton({ onClick, buttonText }: { onClick: () => void, buttonText: string }) {
    return(
        <div className={"bg-white px-10 py-6 cursor-pointer"}
             onClick={() => onClick()}>
            {buttonText}
        </div>
    )
}