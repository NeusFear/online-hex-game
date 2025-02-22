"use client"
import {useEffect, useState} from "react";
import {HexInfo} from "@/app/data/hexInfo";
import {NUM_HEXES, NUM_ROWS, OCEAN_COLOR} from "@/configs/mapConfig";
import HexGrid from "@/components/HexGrid";
import {createNoise2D} from "simplex-noise";
import alea from "alea";

export default function Host() {

    const [hexes, setHexes] = useState<HexInfo[]>([])
    const [seed, setSeed] = useState(Math.random())

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

    useEffect(() => {
        regenerateMap()
    }, []);

    return (
        <div className={`w-screen h-screen ${OCEAN_COLOR}`} >
            <div className="scale-[35%] transform -translate-y-1/4 absolute top-0 left-1/2 -translate-x-1/2">
                <div className="transform -translate-x-36">
                    <HexGrid hexes={hexes} />
                </div>
            </div>
            <div className={"bg-white px-10 py-6 absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10"}
            onClick={() => regenerateMap()}>
                Regenerate Map
            </div>
        </div>
    );
}