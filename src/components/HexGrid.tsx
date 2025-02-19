import Hex from "@/components/Hex";
import {NUM_HEXES, NUM_ROWS, PADDING} from "@/configs/mapConfig";

export default function HexGrid() {

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
            {Array.from({ length: NUM_HEXES }).map((_, i) => (
                <Hex key={i} number={i + 1}
                     width={width}
                     height={height}
                     topOffset={topOffset}
                     bottomMargin={bottomMargin}
                     coordinates={{
                         x: (i % (NUM_ROWS * 2)) / 2,
                         y: Math.round(i / (NUM_ROWS * 2) - 0.5) * 2 + (i % 2 == 0 ? 1 : 0),
                     }}
                />
            ))}
        </div>
    );
}