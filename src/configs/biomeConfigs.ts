export class Resource {
    type: ResourceType;
    quality: number;

    constructor(type: ResourceType, quality: number) {
        this.type = type;
        this.quality = quality;
    }
}

export class ResourceType {

    tileName: string;
    resourceName: string;
    displayName: string;
    uiColor: string;
    isClearable: boolean;

    constructor(tileName: string, resourceName: string, displayName: string, uiColor: string, isClearable: boolean) {
        this.tileName = tileName;
        this.resourceName = resourceName;
        this.displayName = displayName;
        this.uiColor = uiColor;
        this.isClearable = isClearable;
    }

    createResource(): Resource {
        return new Resource(this, Math.round(Math.random() * 3 + 0.5))
    }

}

export const ResourceTypes = {
    NONE: new ResourceType('none', "", "None", "", false),
    WOOD: new ResourceType("timber", "wood", "Wood", "bg-amber-400", true),
    STONE: new ResourceType("stone", "stone", "Stone", "bg-stone-400", true),
    IRON_ORE: new ResourceType("iron", "iron_ore", "Iron Ore", "bg-slate-400", true),
    CROPS: new ResourceType("cacti", "crops", "Crops", "bg-lime-400", true),
    MEAT: new ResourceType("fish", "meat", "Meat", "bg-cyan-400", true),
    PLANKS: new ResourceType("planks", "planks", "Planks", "bg-amber-400", false),
    STONE_BRICKS: new ResourceType("stone bricks", "stone_bricks", "Stone Bricks", "bg-stone-400", false),
    IRON_INGOTS: new ResourceType("iron ingots", "iron_ingots", "Iron Ingots", "bg-zinc-400", false),
    TRASH: new ResourceType("trash", "", "Trash", "bg-orange-400", true),
}

export class Biome {

    name: string;
    color: string;
    background: string;
    resourceRarityMap: Map<ResourceType, number>;

    constructor(name: string, color: string, background: string, resourceRarityMap: Map<ResourceType, number>) {
        this.name = name;
        this.color = color;
        this.background = background;
        this.resourceRarityMap = resourceRarityMap;
    }

    getResource(): Resource {

        let type: ResourceType = ResourceTypes.NONE;

        this.resourceRarityMap.forEach((rarity, resourceType) => {
            if (Math.random() < rarity) type = resourceType;
        })

        return type.createResource();
    }
}

export const Biomes = {
    PLAINS: new Biome("plains", "bg-green-300", "terrain_tiles/grass.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 0.1],
        [ResourceTypes.IRON_ORE, 0.1],
        [ResourceTypes.TRASH, 0.025],
    ])),
    FORREST: new Biome("forest", "bg-green-600", "terrain_tiles/grass.png", new Map<ResourceType, number>([
        [ResourceTypes.WOOD, 1],
    ])),
    OCEAN: new Biome("ocean", "bg-blue-300", "", new Map<ResourceType, number>([
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