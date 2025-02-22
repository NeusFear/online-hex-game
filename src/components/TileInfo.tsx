import {HexInfo} from "@/app/data/hexInfo";
import {ResourceTypes} from "@/configs/resourceConfigs";

export default function TileInfo({selectedHex}: {selectedHex: HexInfo}) {

    if (selectedHex.number == 0) {
        return (
            <div className={"absolute z-50 bg-gray-100 shadow-2xl top-0 left-0 px-6 py-3 rounded-lg m-2 flex flex-col"}>
                <p>No Hex Selected</p>
            </div>
        )
    } else {
        return(
            <div className={"absolute z-50 bg-gray-100 shadow-2xl top-0 left-0 px-6 py-3 rounded-lg m-2 flex flex-col"}>
                <p>Hex Coordinate: [{selectedHex.coordinates.x}, {selectedHex.coordinates.y}]</p>
                <p className={"capitalize"}>Biome: {selectedHex.biome.name}</p>
                <p className={"capitalize"}>Resources: {selectedHex.resource.type != ResourceTypes.NONE && "Quality " + selectedHex.resource.quality} {selectedHex.resource.type.tileName}</p>
            </div>
        )
    }
}