"use client"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

export default function Home() {

    //Hexagon Magic Numbers
    const width = 90;
    const height = 104;
    const topOffset = 77.25;
    const bottomMargin = 51.25;

    //Map information
    const numRows = 24;
    const numHexes = numRows * numRows;
    const padding = 48;

    return (
        <div className="w-screen h-screen bg-blue-400">
            <TransformWrapper
                centerOnInit={true}
                wheel={{smoothStep: 0.002}}
                minScale={0.45}
                doubleClick={{mode: "reset"}}
                initialScale={.45}
            >
                <TransformComponent
                    wrapperClass="bg-blue-300"
                    wrapperStyle={{width:'100%', height:'100%'}}
                >
                    <div className="grid"
                         style={{
                             gridTemplateColumns:"repeat(" + numRows * 2 + ", minmax(0, 1fr))",
                             width: numRows * width + (padding * 2),
                             paddingLeft: padding,
                             paddingRight: padding,
                             paddingTop: padding,
                             paddingBottom: padding,
                         }}>
                        {Array.from({ length: numHexes }).map((_, i) => (
                            <Hex key={i} number={i + 1}
                                 width={width}
                                 height={height}
                                 topOffset={topOffset}
                                 bottomMargin={bottomMargin}
                                 coordinates={{
                                     x: (i % numRows) / 2,
                                     y: Math.round(i / (numRows * 2) - 0.5) * 2 + (i % 2 == 0 ? 1 : 0),
                            }}
                            />
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

function Hex({ number, width, height, topOffset, bottomMargin, coordinates }:
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
          className={"hexagon bg-white relative transform hover:bg-amber-400 flex flex-col content-center justify-center items-center text-black text-[5px]"}
          style={{width: width, height: height, top: number % 2 == 0 ? 0 : topOffset, marginBottom: bottomMargin}}
      >
          <p>{number}</p>
          <p>{"[" + coordinates.x + ", " + coordinates.y + "]"}</p>
      </div>
  )
}
