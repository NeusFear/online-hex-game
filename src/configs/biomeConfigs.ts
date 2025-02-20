export class Resource {
    type: ResourceType;
    quality: number;

    constructor(type: ResourceType, quality: number) {
        this.type = type;
        this.quality = quality;
    }
}

export class ResourceType {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    createResource(): Resource {
        return new Resource(this, Math.round(Math.random() * 3 + 0.5))
    }

}

export const ResourceTypes = {
    NONE: new ResourceType('none'),
    LUMBER: new ResourceType("lumber"),
    CACTI: new ResourceType("cacti"),
    STONE: new ResourceType("stone"),
    IRON: new ResourceType("iron"),
    TRASH: new ResourceType("trash"),
    FISH: new ResourceType("fish"),
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
        [ResourceTypes.IRON, 0.1],
        [ResourceTypes.TRASH, 0.025],
    ])),
    FORREST: new Biome("forest", "bg-green-600", "terrain_tiles/grass.png", new Map<ResourceType, number>([
        [ResourceTypes.LUMBER, 1],
    ])),
    OCEAN: new Biome("ocean", "bg-blue-300", "", new Map<ResourceType, number>([
        [ResourceTypes.TRASH, 0.025],
        [ResourceTypes.FISH, 0.1],
    ])),
    MOUNTAIN: new Biome("mountain", "bg-gray-300", "terrain_tiles/stone.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 1],
        [ResourceTypes.IRON, 0.1],
    ])),
    DESERT: new Biome("desert", "bg-yellow-500", "terrain_tiles/sand.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 0.1],
        [ResourceTypes.IRON, 0.2],
        [ResourceTypes.CACTI, 0.1]
    ])),
    MESA: new Biome("mesa", "bg-yellow-700", "terrain_tiles/mesa.png", new Map<ResourceType, number>([
        [ResourceTypes.STONE, 0.1],
        [ResourceTypes.IRON, 0.3],
    ])),
}