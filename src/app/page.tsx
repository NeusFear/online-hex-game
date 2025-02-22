"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";
import Join from "@/components/Join";

export default function Home() {

    const [joining, setJoining] = useState(false);

    return (
        <div className={"bg-blue-300 h-screen w-screen flex center items-center justify-center p-12"}>
            <div className={"h-full w-full flex flex-col items-center justify-center"} style={{
                backgroundImage: "url(home/home_background.png)",
                backgroundPosition: "50% 50%",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"}}
            >
                { !joining ? <Landing handleJoin={() => setJoining(true)} /> : <Join handleBack={() => setJoining(false)} /> }
            </div>
        </div>
    )
}

function Landing({handleJoin}: {handleJoin: () => void}) {

    const router = useRouter();

    return(
        <>
            <h1 className={"text-6xl font-bold text-white"}>SOME GAME NAME</h1>
            <div className={"animate-pulse"}>
                <h2 className={"text-2xl text-yellow-300 transform -rotate-6 translate-x-1/2"}>A Game about continental domination!</h2>
            </div>
            <div className={"flex flex-row m-12 gap-4"}>
                <button onClick={() => router.push("/host")} className={"bg-yellow-500 hover:bg-yellow-600 py-4 px-10"}>Host</button>
                <button onClick={handleJoin} className={"bg-yellow-500 hover:bg-yellow-600 py-4 px-10"}>Join</button>
            </div>
        </>
    )
}