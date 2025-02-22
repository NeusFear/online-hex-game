import {ResourceType} from "@/app/data/resourceType";

export class Resource {
    type: ResourceType;
    quality: number;

    constructor(type: ResourceType, quality: number) {
        this.type = type;
        this.quality = quality;
    }
}