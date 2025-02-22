import {HexInfo} from "@/app/data/hexInfo";
import {ResourceTypes} from "@/configs/resourceConfigs";

export default function Hex({ hexInfo, width, height, topOffset, bottomMargin, handleSelection, debug }:
                            {
                                hexInfo: HexInfo;
                                width: number,
                                height: number,
                                topOffset: number,
                                bottomMargin: number,
                                handleSelection?: (hexInfo: HexInfo) => void,
                                debug: boolean,
                            }) {

    const handleClick = (hexInfo: HexInfo) => {
        if (handleSelection) handleSelection(hexInfo);
    }

    return (
        <div className={hexInfo.biome.color + " hexagon relative transform hover:opacity-75"}
             style={{
                 width: width,
                 height: height,
                 top: hexInfo.number % 2 == 0 ? 0 : topOffset,
                 marginBottom: bottomMargin,
                 backgroundImage: "url(" + hexInfo.biome.background +")",
                 backgroundPosition: "50% 50%",
                 backgroundSize: "102%",
             }}
             onClick={() => {handleClick(hexInfo)}}>
            <HexResource hexInfo={hexInfo} debug={debug} />
        </div>
    )
}

function HexResource({hexInfo, debug}: {hexInfo: HexInfo, debug: boolean}) {

    const hasBackground = hexInfo.resource.type != ResourceTypes.NONE;

    return(
        <div className={"relative top-0 left-0 w-full h-full items-center justify-center flex"}
             style={hasBackground ? {
                 backgroundImage: "url(resource_tiles/" + hexInfo.resource.type.tileName + "_" + hexInfo.resource.quality +".png)",
                 backgroundPosition: "50% 50%",
                 backgroundSize: "80%",
                 backgroundRepeat: "no-repeat",
             } : {}}>
            {debug && <HexLabel hexInfo={hexInfo} />}
        </div>
    )
}

function HexLabel({hexInfo}: {hexInfo: HexInfo}) {
    return (
        <div className={"relative top-0 left-0 w-full h-full flex flex-col content-center justify-center items-center text-black text-[5px] z-50"}>
            <p>{hexInfo.biome.name}</p>
            <p>{hexInfo.resource.type.tileName} {hexInfo.resource.type != ResourceTypes.NONE && "(" + hexInfo.resource.quality + ")"}</p>
        </div>
    )
}