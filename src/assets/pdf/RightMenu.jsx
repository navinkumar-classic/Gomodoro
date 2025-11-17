import PDFTimer from "./PDFTimer";
import PlayPause from "../icons/PlayPause.jsx";
import Replay from "../icons/Replay.jsx";
import {useState} from "react";
import Close from "../icons/Close.jsx";
import TextField from "@mui/material/TextField";

const fontStyle = {
    style: {
        color: "white",
        fontFamily: "Rajdhani, sans-serif"
    }
}

const inputStyle = {
    "& .MuiFilledInput-root": {
        backgroundColor: "transparent",
        borderBottom: "1px solid white",
        "&:hover": {
            borderBottom: "2px solid white",
        },
        "&.Mui-focused": {
            borderBottom: "2px solid white",
        },
    },
}

export default function RightMenu({
                                      topOffset,
                                      currentTime,
                                      totalTime,
                                      isPause,
                                      playFunction,
                                      pauseFunction,
                                      replayFunction,
                                      extendTime,
                                      rightMenuOpen,
                                      setTimerMenu,
                                      setTimer,
                                      isActive
                                  }) {
    const [playPauseHover, setPlayPauseHover] = useState(false);
    const [replayHover, setReplayHover] = useState(false);

    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const pausePlay = () => {
        if (isPause) return playFunction();
        return pauseFunction();
    }

    const startTimer = () => {
        if (minutes && seconds) {
            setTimer(Number(minutes) * 60 + Number(seconds));
        }
        else {
            alert("Please fill all the fields");
        }
    }

    return (
        <div
            className={`${rightMenuOpen ? "visible" : "hidden"} md:w-auto w-[100vw] fixed right-0 p-3 text-white z-[100] md:mr-[15px] mr-0 px-8 md:bg-[#161616]/50 bg-[#161616]/90 md:backdrop-blur-[0px] backdrop-blur-[2px] border-l border-t border-[#222222] overflow-y-auto flex flex-col items-center justify-center`}
            style={{top: topOffset, bottom: 0}}
        >
            {isActive ? (
                <div className={`flex flex-col items-center justify-center`}>
                    <span className={`ml-auto`} onClick={() =>setTimerMenu()}>
                        <Close width={30} height={30} color={"white"}/>
                    </span>

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

                        <div
                            className={`bg-[#4D4D4D]/50 ml-2 rajdhani flex backdrop-blur-[2px] gap-3 rounded-full p-2 px-4`}>
                            <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`}
                                 onClick={() => extendTime(60)}>
                                +01 <span className={`font-normal text-xs`}>min</span>
                            </div>
                            <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`}
                                 onClick={() => extendTime(300)}>
                                +05 <span className={`font-normal text-xs`}>min</span>
                            </div>
                            <div className={`md:text-2xl text-xl font-bold text-white hover:text-[#BBBBBB]`}
                                 onClick={() => extendTime(900)}>
                                +15 <span className={`font-normal text-xs`}>min</span>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className={`flex flex-col items-center justify-center px-4`}>
                    <TextField id="filled-basic"
                               label="Minutes"
                               variant="filled"
                               type="number"
                               InputProps={fontStyle}
                               InputLabelProps={fontStyle}
                               sx={inputStyle}
                               fullWidth
                               required
                               onChange={(e) => setMinutes(e.target.value)}
                    />

                    <TextField id="filled-basic"
                               label="Seconds"
                               variant="filled"
                               type="number"
                               InputProps={fontStyle}
                               InputLabelProps={fontStyle}
                               sx={inputStyle}
                               fullWidth
                               required
                               onChange={(e) => setSeconds(e.target.value)}
                    />

                    <div
                        className={`bg-white text-black text-center p-3 rounded-sm mt-5 mx-2 font-medium text-lg cursor-pointer`}
                        onClick={() => startTimer()}>
                        Start Timer
                    </div>
                </div>
            )}

        </div>
    );
}