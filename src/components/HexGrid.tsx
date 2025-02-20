import Hex from "@/components/Hex";
import {NUM_ROWS, PADDING} from "@/configs/mapConfig";
import {HexInfo} from "@/util/hexInfo";

export default function HexGrid({hexes, handleSelection}: {
    hexes: HexInfo[],
    handleSelection: (hex: HexInfo) => void
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
                 width: NUM_ROWS * width + (PADDING * 2),
                 paddingLeft: PADDING,
                 paddingRight: PADDING,
                 paddingTop: PADDING,
                 paddingBottom: PADDING,
             }}>
            {hexes.map((hex, i) => <Hex key={i} hexInfo={hex} width={width} height={height} topOffset={topOffset} bottomMargin={bottomMargin} handleSelection={handleSelection} />)}
        </div>
    );
}