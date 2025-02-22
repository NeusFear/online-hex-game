import Hex from "@/components/Hex";
import {NUM_ROWS} from "@/configs/mapConfig";
import {HexInfo} from "@/app/data/hexInfo";

export default function HexGrid({hexes, handleSelection, debug}: {
    hexes: HexInfo[],
    handleSelection?: (hex: HexInfo) => void,
    debug?: boolean
}) {

    //Hexagon Magic Numbers
    const width = 90;
    const height = 104;
    const topOffset = 77.25;
    const bottomMargin = 51.25;

    return (
        <div className="grid"
             style={{
                 gridTemplateColumns:"repeat(" + NUM_ROWS * 2 + ", minmax(0, 1fr))",
                 width: NUM_ROWS * width,
             }}>
            {hexes.map((hex, i) => <Hex key={i} debug={debug || false} hexInfo={hex} width={width} height={height} topOffset={topOffset} bottomMargin={bottomMargin} handleSelection={handleSelection} />)}
        </div>
    );
}