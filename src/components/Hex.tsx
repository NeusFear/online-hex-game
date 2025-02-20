import {HexInfo} from "@/util/hexInfo";
import {ResourceTypes} from "@/configs/biomeConfigs";

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
        <div className={hexInfo.biome.color + " hexagon relative transform hover:opacity-75"}
             style={{
                 width: width,
                 height: height,
                 top: hexInfo.number % 2 == 0 ? 0 : topOffset,
                 marginBottom: bottomMargin,
                 background: "url(" + hexInfo.biome.background +")",
                 backgroundPosition: "50% 50%",
                 backgroundSize: "102%",
             }}
             onClick={() => {handleSelection(hexInfo)}}>
            <HexResource hexInfo={hexInfo} />
        </div>
    )
}

function HexResource({hexInfo}: {hexInfo: HexInfo}) {
    return(
        <div className={"relative top-0 left-0 w-full h-full bg-red-900 items-center justify-center flex"}
             style={{
                 background: "url(resource_tiles/" + hexInfo.resource.type.name + "_" + hexInfo.resource.quality +".png)",
                 backgroundPosition: "50% 50%",
                 backgroundSize: "80%",
                 backgroundRepeat: "no-repeat",
             }}>
            <HexLabel hexInfo={hexInfo} />
        </div>
    )
}

function HexLabel({hexInfo}: {hexInfo: HexInfo}) {
    return (
        <div className={"relative top-0 left-0 w-full h-full flex flex-col content-center justify-center items-center text-black text-[5px] z-50"}>
            <p>{hexInfo.biome.name}</p>
            <p>{hexInfo.resource.type.name} {hexInfo.resource.type != ResourceTypes.NONE && "(" + hexInfo.resource.quality + ")"}</p>
        </div>
    )
}