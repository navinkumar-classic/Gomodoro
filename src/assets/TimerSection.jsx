import Timer from "./timer/Timer.jsx";
import Replay from "./icons/Replay.jsx";
import Play from "./icons/Play.jsx";
import Pause from "./icons/Pause.jsx";
import Next from "./icons/Next.jsx";

export  default function TimerSection({currentTime, totalTime, pauseFunction, playFunction, replayFunction, ongoingTask, moveToNextTask}) {
    return(
        <div className={`basis-[40%] lg:h-screen md:h-screen h-auto lg:p-24 md:p-12 p-9 flex flex-col z-10`}>
            <div className={`grow flex flex-col items-center justify-center`}>
                <Timer currentTime = {currentTime} totalTime = {totalTime} ongoingTask={ongoingTask} />
                <div className={`flex flex-row mt-5 gap-4 cursor-pointer`}>
                    <span onClick={playFunction}>
                        <Play width={35} height={35} />
                    </span>
                    <span onClick={pauseFunction}>
                        <Pause width={50} height={50}/>
                    </span>
                    <span className={`pt-2`} onClick={moveToNextTask}>
                        <Next width={32} height={32} color={"#FFFFFF"} />
                    </span>
                    <span onClick={replayFunction}>
                        <Replay width={35} height={35} />
                    </span>
                </div>
            </div>
            <div className={`width-[30%] bg-[#4D4D4D]/50 backdrop-blur-[2px] lg:mt-0 md:mt-2 mt-4 rounded-lg py-9`}>

            </div>
        </div>
    );
}