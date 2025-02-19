import {HexInfo} from "@/util/hexInfo";

export default function Hex({ hexInfo, width, height, topOffset, bottomMargin, handleSelection }:
                            {
                                hexInfo: HexInfo;
                                width: number,
                                height: number,
                                topOffset: number,
                                bottomMargin: number,
                                handleSelection: (hexInfo: HexInfo) => void,
                            }) {

    return (
        <div
            className={hexInfo.biome.color + " hexagon relative transform hover:opacity-75 flex flex-col content-center justify-center items-center text-black text-[5px]"}
            style={{
                width: width,
                height: height,
                top: hexInfo.number % 2 == 0 ? 0 : topOffset,
                marginBottom: bottomMargin,
                background: "url(" + hexInfo.biome.background +")",
                backgroundPosition: "50% 50%",
                backgroundSize: "102%",
            }}
            onClick={() => {handleSelection(hexInfo)}}
        >
            <p>{hexInfo.biome.name}</p>
        </div>
    )
}