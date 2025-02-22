import {getBiome} from "@/util/biomeSelector";
import {Biome} from "@/app/data/biome";
import {Resource} from "@/app/data/resource";
import {NoiseFunction2D} from "simplex-noise";

export class HexInfo {

    number: number;
    coordinates: { x: number; y: number };
    biome: Biome;
    resource: Resource;

    constructor(number: number, coordinates: { x: number; y: number }, noiseFunction: NoiseFunction2D) {
        this.number = number;
        this.coordinates = coordinates;
        this.biome = getBiome(noiseFunction, coordinates);
        this.resource = this.biome.getResource();
    }

}