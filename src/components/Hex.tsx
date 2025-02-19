import {getBiome, getHeightmap} from "@/util/biomeSelector";

export default function Hex({ number, width, height, topOffset, bottomMargin, coordinates }:
                            {
                                number: number,
                                width: number,
                                height: number,
                                topOffset: number,
                                bottomMargin: number,
                                coordinates: {x: number, y: number}
                            }) {

    return (
        <div
            className={getBiome(coordinates).color + " hexagon relative transform hover:bg-amber-400 flex flex-col content-center justify-center items-center text-black text-[5px]"}
            style={{width: width, height: height, top: number % 2 == 0 ? 0 : topOffset, marginBottom: bottomMargin}}
        >
            <p>{getHeightmap(coordinates)}</p>
            <p>{"[" + coordinates.x + ", " + coordinates.y + "]"}</p>
        </div>
    )
}