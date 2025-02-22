import {Resource} from "@/app/data/resource";

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