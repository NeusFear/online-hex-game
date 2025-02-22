import {ResourceType} from "@/app/data/resourceType";
import {Biome} from "@/app/data/biome";
import {ResourceTypes} from "@/configs/resourceConfigs";
import {OCEAN_COLOR} from "@/configs/mapConfig";

export const BiomeTypes = {
    PLAINS: new Biome("plains", "bg-green-300", "terrain_tiles/grass.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 0.1],
        [ResourceTypes.IRON_ORE, 0.1],
        [ResourceTypes.TRASH, 0.025],
    ])),
    FORREST: new Biome("forest", "bg-green-600", "terrain_tiles/grass.png", new Map<ResourceType, number>([
        [ResourceTypes.WOOD, 1],
    ])),
    OCEAN: new Biome("ocean", OCEAN_COLOR, "", new Map<ResourceType, number>([
        [ResourceTypes.TRASH, 0.025],
        [ResourceTypes.MEAT, 0.1],
    ])),
    MOUNTAIN: new Biome("mountain", "bg-gray-300", "terrain_tiles/stone.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 1],
        [ResourceTypes.IRON_ORE, 0.1],
    ])),
    DESERT: new Biome("desert", "bg-yellow-500", "terrain_tiles/sand.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 0.1],
        [ResourceTypes.IRON_ORE, 0.2],
        [ResourceTypes.CROPS, 0.1]
    ])),
    MESA: new Biome("mesa", "bg-yellow-700", "terrain_tiles/mesa.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 1],
        [ResourceTypes.IRON_ORE, 0.3],
    ])),
}