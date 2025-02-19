export class Biome {

    name: string;
    color: string;
    background: string;

    constructor(name: string, color: string, background: string) {
        this.name = name;
        this.color = color;
        this.background = background;
    }
}

export const Biomes = {
    PLAINS: new Biome("plains", "bg-green-300", "terrain_tiles/grass.png"),
    FORREST: new Biome("forest", "bg-green-600", "terrain_tiles/forrest.png"),
    OCEAN: new Biome("ocean", "bg-blue-300", ""),
    MOUNTAIN: new Biome("mountain", "bg-gray-300", "terrain_tiles/stone.png"),
    DESERT: new Biome("desert", "bg-yellow-500", "terrain_tiles/sand.png"),
    MESA: new Biome("mesa", "bg-yellow-700", "terrain_tiles/mesa.png"),
}