import Timer from "./timer/Timer.jsx";
import Replay from "./icons/Replay.jsx";
import Play from "./icons/Play.jsx";
import Pause from "./icons/Pause.jsx";
import Next from "./icons/Next.jsx";
import Plus from "./icons/Plus.jsx";

export  default function TimerSection({currentTime, totalTime, pauseFunction, playFunction, replayFunction, ongoingTask, moveToNextTask, extendTime}) {
    return(
        <div className={`basis-[40%] lg:h-screen md:h-screen h-auto lg:p-24 md:p-12 p-9 flex flex-col z-10`}>
            <div className={`grow flex flex-col items-center justify-center`}>
                <Timer currentTime = {currentTime} totalTime = {totalTime} ongoingTask={ongoingTask} />
                <div className={`flex flex-row mt-5 gap-3 cursor-pointer`}>
                    <span className={`pt-2`} onClick={playFunction}>
                        <Play width={35} height={35} />
                    </span>
                    <span onClick={pauseFunction}>
                        <Pause width={50} height={50}/>
                    </span>
                    <span className={`mt-2 mr-2`} onClick={moveToNextTask}>
                        <Next width={32} height={32} color={"#FFFFFF"} />
                    </span>
                    <span className={`mt-2`} onClick={replayFunction}>
                        <Replay width={35} height={35} />
                    </span>
                </div>

                <div className={`flex flex-row mt-3 items-center cursor-pointer`}>

                    <Plus width={20} height={20} lineWidth={8}/>

                    <div className={`bg-[#4D4D4D]/50 ml-2 rajdhani flex backdrop-blur-[2px] gap-3 rounded-full p-2 px-4`}>
                        <div className={`text-2xl font-bold`} onClick={() => extendTime(60)}>
                            01 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`text-2xl font-bold`} onClick={() => extendTime(300)}>
                            05 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`text-2xl font-bold`} onClick={() => extendTime(900)}>
                            15 <span className={`font-normal text-xs`}>min</span>
                        </div>
                        <div className={`text-2xl font-bold`} onClick={() => extendTime(1800)}>
                            30 <span className={`font-normal text-xs`}>min</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}