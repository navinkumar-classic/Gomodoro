import Timer from "./timer/Timer.jsx";
import Replay from "./icons/Replay.jsx";
import Next from "./icons/Next.jsx";
import PlayPause from "./icons/PlayPause.jsx";

import { useState } from "react";


export  default function TimerSection({currentTime, totalTime, pauseFunction, isPause, playFunction, replayFunction, ongoingTask, moveToNextTask, extendTime}) {

    const [playPauseHover, setPlayPauseHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);
    const [replayHover, setReplayHover] = useState(false);

    const pausePlay = () => {
        if(isPause) return playFunction();
        return pauseFunction();
    }
    return(
        <div className={`basis-[40%] lg:h-screen md:h-screen h-auto lg:p-24 md:p-12 p-9 flex flex-col z-10`}>
            <div className={`grow flex flex-col items-center justify-center`}>
                <Timer currentTime = {currentTime} totalTime = {totalTime} ongoingTask={ongoingTask} />
                <div className={`flex flex-row mt-5 gap-3 cursor-pointer`}>

                    <span className={`mr-2`} onClick={pausePlay} onMouseEnter={() => setPlayPauseHover(true)} onMouseLeave={() => setPlayPauseHover(false)}>
                        <PlayPause width={60} height={60} color={`${playPauseHover ? "#BBBBBB" : "#FFFFFF"}`}/>
                    </span>
                    <span className={`mt-3 mr-2`} onClick={moveToNextTask} onMouseEnter={() => setNextHover(true)} onMouseLeave={() => setNextHover(false)}>
                        <Next width={32} height={32} color={`${nextHover ? "#BBBBBB" : "#FFFFFF"}`} />
                    </span>
                    <span className={`mt-3`} onClick={replayFunction} onMouseEnter={() => setReplayHover(true)} onMouseLeave={() => setReplayHover(false)}>
                        <Replay width={35} height={35} color={`${replayHover ? "#BBBBBB" : "#FFFFFF"}`} />
                    </span>
                </div>

                <div className={`flex flex-row lg:mt-3 mt-6 items-center cursor-pointer`}>

                    <div className={`bg-[#4D4D4D]/50 ml-2 rajdhani flex backdrop-blur-[2px] gap-3 rounded-full p-2 px-4`}>
                        <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`} onClick={() => extendTime(60)}>
                            +01 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`} onClick={() => extendTime(300)}>
                            +05 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`} onClick={() => extendTime(900)}>
                            +15 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`} onClick={() => extendTime(1800)}>
                            +30 <span className={`font-normal text-xs`}>min</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}