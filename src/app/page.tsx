"use client"
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import HexGrid from "@/components/HexGrid";

export default function Home() {

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
                    <HexGrid />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
