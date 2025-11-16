import PDFTimer from "./PDFTimer";
import PlayPause from "../icons/PlayPause.jsx";
import Replay from "../icons/Replay.jsx";
import {useState} from "react";

export default function RightMenu({topOffset, currentTime, totalTime, isPause, playFunction, pauseFunction, replayFunction, extendTime, rightMenuOpen}) {
    const [playPauseHover, setPlayPauseHover] = useState(false);
    const [replayHover, setReplayHover] = useState(false);

    const pausePlay = () => {
        if(isPause) return playFunction();
        return pauseFunction();
    }

    return (
        <div
            className={`${rightMenuOpen ? "visible" : "hidden"} fixed right-0 p-3 text-white z-[100] mr-[15px] px-8 bg-[#161616]/50 border-l border-t border-[#222222] overflow-y-auto flex flex-col items-center justify-center`}
            style={{top: topOffset, height: `${window.innerHeight - topOffset}px`}}
        >
            <PDFTimer currentTime={currentTime} totalTime={totalTime}/>

            <div className={`flex flex-row mt-5 gap-3 cursor-pointer`}>

                <span className={`mr-2`} onClick={pausePlay} onMouseEnter={() => setPlayPauseHover(true)}
                          onMouseLeave={() => setPlayPauseHover(false)}>
                    <PlayPause width={47} height={47} color={`${playPauseHover ? "#BBBBBB" : "#FFFFFF"}`}/>
                </span>
                <span className={`mt-3`} onClick={replayFunction} onMouseEnter={() => setReplayHover(true)}
                      onMouseLeave={() => setReplayHover(false)}>
                    <Replay width={28} height={28} color={`${replayHover ? "#BBBBBB" : "#FFFFFF"}`}/>
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
                </div>

            </div>

        </div>
    );
}