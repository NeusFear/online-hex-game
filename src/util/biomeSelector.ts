import {NUM_ROWS} from "@/configs/mapConfig";
import { createNoise2D } from "simplex-noise";
import alea from "alea";

const NOISE_2D = createNoise2D();

class Biome {

    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

class NoiseLayer {

    influence: number;
    scale: number;

    constructor(influence: number, scale: number) {
        this.influence = influence;
        this.scale = scale;
    }

    getNoise2D({x, y}: {x: number, y: number}) {
        return this.influence * NOISE_2D(x / this.scale, y / this.scale);
    }

}

export const Biomes = {
    FORREST: new Biome("forest", "bg-green-600"),
    OCEAN: new Biome("ocean", "bg-blue-300"),
}

export function getHeightmap(coordinates: { x: number; y: number; }): number {

    const center = { x: NUM_ROWS / 2, y: NUM_ROWS / 2}
    const distFromCenter = Math.sqrt(Math.pow(coordinates.x - center.x, 2) + Math.pow(coordinates.y - center.y, 2));

    const noiseLayer1 = new NoiseLayer(3, 25);
    const noiseLayer2 = new NoiseLayer(9, 12);
    const noiseLayer3 = new NoiseLayer(1.5, 3);

    const totalNoise =
        noiseLayer1.getNoise2D(coordinates) +
        noiseLayer2.getNoise2D(coordinates) +
        noiseLayer3.getNoise2D(coordinates);

    const distanceInfluence = 5
    const distanceMultiplier = 1 / Math.pow(distFromCenter, distanceInfluence);

    return totalNoise * distanceMultiplier;
}

export function getBiome(coordinates: { x: number; y: number; }): Biome {
    return getHeightmap(coordinates) > 0.00003 ? Biomes.FORREST : Biomes.OCEAN;
}