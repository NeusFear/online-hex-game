import {ResourceType, ResourceTypes} from "@/configs/biomeConfigs";

export default function ResourcesInfo(
    {wood, stone, ironOre, crops, meat, planks, stoneBricks, ironIngots,
    woodMax, stoneMax, ironOreMax, cropsMax, meatMax, planksMax, stoneBricksMax, ironIngotsMax }: {
    wood: number, stone: number, ironOre: number, crops: number, meat: number, planks: number, stoneBricks: number, ironIngots: number
    woodMax: number, stoneMax: number, ironOreMax: number, cropsMax: number, meatMax: number, planksMax: number, stoneBricksMax: number, ironIngotsMax: number
}) {

    return(
        <div className={"flex flex-col absolute right-0 top-0"}>
            <ResourceCounter resourceType={ResourceTypes.WOOD} resourceCount={wood} resourceMax={woodMax} />
            <ResourceCounter resourceType={ResourceTypes.STONE} resourceCount={stone} resourceMax={stoneMax} />
            <ResourceCounter resourceType={ResourceTypes.IRON_ORE} resourceCount={ironOre} resourceMax={ironOreMax} />
            <ResourceCounter resourceType={ResourceTypes.CROPS} resourceCount={crops} resourceMax={cropsMax} />
            <ResourceCounter resourceType={ResourceTypes.MEAT} resourceCount={meat} resourceMax={meatMax} />
            <ResourceCounter resourceType={ResourceTypes.PLANKS} resourceCount={planks} resourceMax={planksMax} />
            <ResourceCounter resourceType={ResourceTypes.STONE_BRICKS} resourceCount={stoneBricks} resourceMax={stoneBricksMax} />
            <ResourceCounter resourceType={ResourceTypes.IRON_INGOTS} resourceCount={ironIngots} resourceMax={ironIngotsMax} />
        </div>
    )
}

function ResourceCounter({resourceType, resourceCount, resourceMax}: {
    resourceType: ResourceType,
    resourceCount: number,
    resourceMax: number
}) {
    return(
        <div className={"flex flex-row h-14"}>
            <ResourceIcon resourceType={resourceType} />
            <ResourceBar resourceType={resourceType} resourceCount={resourceCount} resourceMax={resourceMax} />
        </div>
    )
}

function ResourceIcon({resourceType}: {
    resourceType: ResourceType,
}) {
    return(
        <div className={`${resourceType.uiColor} z-50 flex flex-col items-center justify-center w-12 h-12 rounded-full border-gray-800 border-2 mt-2`}>
            <div className={"w-full h-full"} style={{
                background: "url(resource_icons/" + resourceType.resourceName + ".png)",
                backgroundPosition: "50% 50%",
                backgroundSize: "60%",
                backgroundRepeat: "no-repeat",
            }}></div>
        </div>
    )
}

function ResourceBar({resourceType, resourceCount, resourceMax}: {
    resourceType: ResourceType
    resourceCount: number,
    resourceMax: number
}) {

    return(
        <div className={"transform -translate-x-4"}>
            <p className={"font-bold text-white pl-4"}>{resourceType.displayName}</p>
            <div className={"w-64 h-14 flex flex-row"}>
                <div className={`relative top-0 left-0 ${resourceType.uiColor} h-6 z-20 rounded-l-md text-black font-bold text-xs p-1 pl-5`} style={{width: Math.round(resourceCount/resourceMax * 100) + "%"}}>{resourceCount}/{resourceMax}</div>
                <div className={`relative top-0 left-0 ${resourceType.uiColor} z-10 h-6 rounded-r-md flex-grow brightness-50`}></div>
            </div>
        </div>
    )
}