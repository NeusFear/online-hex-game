"use client"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import HexGrid from "@/components/HexGrid";
import TileInfo from "@/components/TileInfo";
import {useEffect, useState} from "react";
import {HexInfo} from "@/app/data/hexInfo";
import {NUM_HEXES, NUM_ROWS, OCEAN_COLOR} from "@/configs/mapConfig";
import ResourcesInfo from "@/components/ResourcesInfo";
import {createNoise2D} from "simplex-noise";
import alea from "alea";
//import HexActions from "@/components/HexActions";

export default function Play() {

    const [selectedHex, setSelectedHex] = useState(new HexInfo(0, {x: 0, y: 0}, createNoise2D(alea(Math.random()))));

    const handleSelection = (newSelection: HexInfo) => {
        setSelectedHex(newSelection);
    }

    const [hexes, setHexes] = useState<HexInfo[]>([])

    const [woodResourceCount, setWoodResourceCount] = useState(10);
    const [woodResourceCapacity, setWoodResourceCapacity] = useState(100);

    const [stoneResourceCount, setStoneResourceCount] = useState(20);
    const [stoneResourceCapacity, setStoneResourceCapacity] = useState(100);

    const [ironOreResourceCount, setIronOreResourceCount] = useState(30);
    const [ironOreResourceCapacity, setIronOreResourceCapacity] = useState(100);

    const [cropsResourceCount, setCropsResourceCount] = useState(10);
    const [cropsResourceCapacity, setCropsResourceCapacity] = useState(100);

    const [meatResourceCount, setMeatResourceCount] = useState(20);
    const [meatResourceCapacity, setMeatResourceCapacity] = useState(100);

    const [planksResourceCount, setPlanksResourceCount] = useState(30);
    const [planksResourceCapacity, setPlanksResourceCapacity] = useState(100);

    const [stoneBricksResourceCount, setStoneBricksResourceCount] = useState(100);
    const [stoneBricksResourceCapacity, setStoneBricksResourceCapacity] = useState(100);

    const [ironIngotsResourceCount, setIronIngotsResourceCount] = useState(70);
    const [ironIngotsResourceCapacity, setIronIngotsResourceCapacity] = useState(100);

    useEffect(() => {
        setHexes(Array.from({ length: NUM_HEXES })
            .map((_, i) => (
                    new HexInfo(
                        i + 1,
                        {
                            x: (i % (NUM_ROWS * 2)) / 2,
                            y: Math.round(i / (NUM_ROWS * 2) - 0.5) * 2 + (i % 2 == 0 ? 1 : 0)
                        },
                        createNoise2D(alea(Math.random()))
                    )
                )
            ))
    }, []);

    return (
        <div className={`w-screen h-screen ${OCEAN_COLOR}`}>
            <TransformWrapper
                centerOnInit={true}
                wheel={{smoothStep: 0.002}}
                minScale={0.45}
                doubleClick={{mode: "reset"}}
                initialScale={.45}
            >
                <TransformComponent
                    wrapperClass={OCEAN_COLOR}
                    wrapperStyle={{width:'100%', height:'100%'}}
                >
                    <HexGrid hexes={hexes} debug={true} handleSelection={handleSelection} />
                </TransformComponent>
            </TransformWrapper>
            <TileInfo selectedHex={selectedHex} />
            <ResourcesInfo
                wood={woodResourceCount}
                stone={stoneResourceCount}
                ironOre={ironOreResourceCount}
                crops={cropsResourceCount}
                meat={meatResourceCount}
                planks={planksResourceCount}
                stoneBricks={stoneBricksResourceCount}
                ironIngots={ironIngotsResourceCount}
                woodMax={woodResourceCapacity}
                stoneMax={stoneResourceCapacity}
                ironOreMax={ironOreResourceCapacity}
                cropsMax={cropsResourceCapacity}
                meatMax={meatResourceCapacity}
                planksMax={planksResourceCapacity}
                stoneBricksMax={stoneBricksResourceCapacity}
                ironIngotsMax={ironIngotsResourceCapacity} />
            {/*<HexActions selectedHex={selectedHex} />*/}
        </div>
    );
}
