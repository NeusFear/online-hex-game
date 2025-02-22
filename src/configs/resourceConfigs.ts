import {ResourceType} from "@/app/data/resourceType";

export const ResourceTypes = {
    NONE: new ResourceType('none', "", "None", "", false),
    WOOD: new ResourceType("timber", "wood", "Wood", "bg-amber-400", true),
    STONE: new ResourceType("stone", "stone", "Stone", "bg-stone-400", true),
    IRON_ORE: new ResourceType("iron", "iron_ore", "Iron Ore", "bg-slate-400", true),
    CROPS: new ResourceType("cacti", "crops", "Crops", "bg-lime-400", true),
    MEAT: new ResourceType("fish", "meat", "Meat", "bg-cyan-400", true),
    PLANKS: new ResourceType("planks", "planks", "Planks", "bg-amber-400", false),
    STONE_BRICKS: new ResourceType("stone bricks", "stone_bricks", "Stone Bricks", "bg-stone-400", false),
    IRON_INGOTS: new ResourceType("iron ingots", "iron_ingots", "Iron Ingots", "bg-zinc-400", false),
    TRASH: new ResourceType("trash", "", "Trash", "bg-orange-400", true),
}