import {HexInfo} from "@/app/data/hexInfo";
import React from "react";
import {ResourceTypes} from "@/configs/resourceConfigs";

export default function HexActions({selectedHex}: { selectedHex: HexInfo }) {

    const handleAction = (hexInfo: HexInfo) => {
        if (hexInfo.resource.quality == 1) hexInfo.resource.type = ResourceTypes.NONE;
        hexInfo.resource.quality--;
        console.log(hexInfo.resource.type, hexInfo.resource.quality);
    }

    return (
        <div
            className={"absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-red-900 flex-row flex items-center justify-center"}>
            {selectedHex.resource.type.isClearable && <ClearResourceAction hexInfo={selectedHex} handleAction={handleAction} />}
        </div>
    )
}

function ClearResourceAction({hexInfo, handleAction}: {hexInfo: HexInfo, handleAction: (hexInfo: HexInfo) => void}) {
    return (
        <ActionButton hexInfo={hexInfo} handleAction={handleAction} />
    )
}

function ActionButton({hexInfo, handleAction}: {hexInfo: HexInfo, handleAction: (hexInfo: HexInfo) => void}) {

    return (
        <div className={"bg-blue-400 w-32 h-32"} onClick={() => {handleAction(hexInfo)}}>
            blah
        </div>
    )
}