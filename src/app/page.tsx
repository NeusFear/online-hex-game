"use client"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import HexGrid from "@/components/HexGrid";
import TileInfo from "@/components/TileInfo";
import {useState} from "react";
import {HexInfo} from "@/util/hexInfo";

export default function Home() {

    const [selectedHex, setSelectedHex] = useState(new HexInfo(0, {x: 0, y: 0}));

    const handleSelection = (newSelection: HexInfo) => {
        setSelectedHex(newSelection);
    }

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
                    <HexGrid handleSelection={handleSelection} />
                </TransformComponent>
            </TransformWrapper>
            <TileInfo selectedHex={selectedHex} />
        </div>
    );
}
