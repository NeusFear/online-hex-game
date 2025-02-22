import {NUM_ROWS} from "@/configs/mapConfig";
import {BiomeTypes} from "@/configs/biomeConfigs";
import {Biome} from "@/app/data/biome";
import {NoiseFunction2D} from "simplex-noise";

class NoiseLayer {

    influence: number;
    scale: number;

    constructor(influence: number, scale: number) {
        this.influence = influence;
        this.scale = scale;
    }

    getNoise2D(noise: NoiseFunction2D, {x, y}: {x: number, y: number}) {
        return this.influence * noise(x / this.scale, y / this.scale);
    }

}

function getDistanceFromCenter(useRadial: boolean, coordinate1: { x: number, y: number }, coordinate2: { x: number, y: number }): number {
    if (useRadial) {
        return Math.sqrt(Math.pow(coordinate1.x - coordinate2.x, 2) + Math.pow(coordinate1.y - coordinate2.y, 2))
    } else {
        return Math.max(Math.abs(coordinate1.x - coordinate2.x), Math.abs(coordinate1.y - coordinate2.y));
    }
}

export function getHeightmap(noise: NoiseFunction2D, coordinates: { x: number; y: number; }): number {

    const center = { x: NUM_ROWS / 2, y: NUM_ROWS / 2}
    const distFromCenter = getDistanceFromCenter(false, coordinates, center);

    const noiseLayer1 = new NoiseLayer(3, 25);
    const noiseLayer2 = new NoiseLayer(9, 12);
    const noiseLayer3 = new NoiseLayer(1.5, 3);

    const totalNoise =
        noiseLayer1.getNoise2D(noise, coordinates) +
        noiseLayer2.getNoise2D(noise, coordinates) +
        noiseLayer3.getNoise2D(noise, coordinates);

    const distanceInfluence = 5
    const distanceMultiplier = 1 / Math.pow(distFromCenter, distanceInfluence);

    return totalNoise * distanceMultiplier;
}

export function getTemperature(noise: NoiseFunction2D, coordinates: { x: number; y: number; }): number {
    const noiseScale = 10
    return noise(coordinates.x / noiseScale, coordinates.y / noiseScale);
}

export function getFertility(noise: NoiseFunction2D, coordinates: { x: number; y: number; }): number {
    const noiseScale = 5
    return noise(coordinates.x / noiseScale, coordinates.y / noiseScale);
}

export function getMountainShape(noise: NoiseFunction2D, coordinates: { x: number; y: number; }): number {

    const noiseScale = 1;
    const ridgeness = 1.09;
    const height = noise(coordinates.x / noiseScale, coordinates.y / noiseScale)

    return Math.pow(height, ridgeness);
}

export function getBiome(noise: NoiseFunction2D, coordinates: { x: number; y: number; }): Biome {

    const oceanCutoff = 0.00003; //Higher means more oceans
    const mountainCutoff = 0.003; //Higher means fewer mountains
    const desertCutoff = 0.6; //Higher means fewer deserts
    const forestCutoff = 0.2; //Higher means more forests

    const heightmap = getHeightmap(noise, coordinates);
    const temperature = getTemperature(noise, coordinates);
    const fertility = getFertility(noise, coordinates);
    const mountainShape = getMountainShape(noise, coordinates);

    if (heightmap < oceanCutoff) return BiomeTypes.OCEAN;
    if (temperature < desertCutoff) {
        if (heightmap > mountainCutoff && mountainShape > 0) return BiomeTypes.MOUNTAIN;
        if (fertility < forestCutoff) return BiomeTypes.FORREST;
        return BiomeTypes.PLAINS
    } else {
        if (heightmap > mountainCutoff && mountainShape > 0) return  BiomeTypes.MESA;
        return  BiomeTypes.DESERT;
    }
}