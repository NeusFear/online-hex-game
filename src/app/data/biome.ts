import {ResourceType} from "@/app/data/resourceType";
import {Resource} from "@/app/data/resource";
import {ResourceTypes} from "@/configs/resourceConfigs";

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