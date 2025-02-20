import {getBiome} from "@/util/biomeSelector";
import {Biome, Resource} from "@/configs/biomeConfigs";

export class HexInfo {

    number: number;
    coordinates: { x: number; y: number };
    biome: Biome;
    resource: Resource;

    constructor(number: number, coordinates: { x: number; y: number }) {
        this.number = number;
        this.coordinates = coordinates;
        this.biome = getBiome(coordinates);
        this.resource = this.biome.getResource();
    }

}