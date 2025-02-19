import {getBiome} from "@/util/biomeSelector";
import {Biome} from "@/configs/biomeConfigs";

export class HexInfo {

    number: number;
    coordinates: { x: number; y: number };
    biome: Biome;

    constructor(number: number, coordinates: { x: number; y: number }) {
        this.number = number;
        this.coordinates = coordinates;
        this.biome = getBiome(coordinates);
    }

}