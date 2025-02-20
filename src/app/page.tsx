"use client"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import HexGrid from "@/components/HexGrid";
import TileInfo from "@/components/TileInfo";
import {useEffect, useState} from "react";
import {HexInfo} from "@/util/hexInfo";
import {NUM_HEXES, NUM_ROWS} from "@/configs/mapConfig";

export default function Home() {

    const [selectedHex, setSelectedHex] = useState(new HexInfo(0, {x: 0, y: 0}));

    const handleSelection = (newSelection: HexInfo) => {
        setSelectedHex(newSelection);
    }

    const [hexes, setHexes] = useState<HexInfo[]>([])

    useEffect(() => {
        setHexes(Array.from({ length: NUM_HEXES })
            .map((_, i) => (
                    new HexInfo(
                        i + 1,
                        {
                            x: (i % (NUM_ROWS * 2)) / 2,
                            y: Math.round(i / (NUM_ROWS * 2) - 0.5) * 2 + (i % 2 == 0 ? 1 : 0)
                        }
                    )
                )
            ))
    }, []);

    return (
        <div className="w-screen h-screen bg-blue-400">
            <TransformWrapper
                centerOnInit={true}
                wheel={{smoothStep: 0.002}}
                minScale={0.45}
                doubleClick={{mode: "reset"}}
                initialScale={.45}
            >
                <TransformComponent
                    wrapperClass="bg-blue-300"
                    wrapperStyle={{width:'100%', height:'100%'}}
                >
                    <HexGrid hexes={hexes} handleSelection={handleSelection} />
                </TransformComponent>
            </TransformWrapper>
            <TileInfo selectedHex={selectedHex} />
        </div>
    );
}
