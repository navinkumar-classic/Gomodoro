import TaskManager from "./task/TaskManager.jsx";
import Plus from "./icons/Plus.jsx";
import MusicOn from "./icons/MusicOn.jsx";
import MusicOff from "./icons/MusicOff.jsx";
import Sound from "./icons/Sound.jsx";
import {useState, useRef} from "react";
import { Slider } from "@mui/material";

export default function TaskSection({setAddTask, currentTask, completedTask, deleteTask}) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        audioRef.current.volume = newValue;
    }

    const showHideVolumeSlider = () => {
        setShowVolume(!showVolume);
    }


    const startMusic = async () => {
        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (err) {
            console.error("Playback failed:", err);
        }
    };

    const stopMusic = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    }

    return(
        <div className={`basis-[60%] h-screen lg:p-24 md:p-12 p-9 flex flex-col z-10`}>
            <TaskManager currentTask={currentTask}
                         completedTask={completedTask}
                         deleteTask={deleteTask}
            />
            <div
                className={`bg-[#4D4D4D]/50 backdrop-blur-[2px] gap-4 rounded-full mt-4 flex justify-center items-center`}>

                {isPlaying ? (
                    <span onClick={() => stopMusic()}>
                        <MusicOn width={50} height={50} color="#FFF"/>
                    </span>
                ):(
                    <span onClick={() => startMusic()}>
                        <MusicOff width={50} height={50} color="#FFF"/>
                    </span>
                )}


                <div className={`bg-[#FF5959] rounded-full cursor-pointer p-3`} onClick={() => setAddTask(true)}>
                    <Plus width={38} height={38} lineWidth={8}/>
                </div>

                <span onClick={() => showHideVolumeSlider()} >
                    <Sound width={50} height={50} color="#FFF"/>

                    {showVolume && (
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#222] p-3 rounded-xl shadow-lg w-64">
                            <Slider
                                value={volume}
                                onChange={handleVolumeChange}
                                min={0}
                                max={1}
                                step={0.01}
                                sx={{
                                    color: "#FF5959",
                                    '& .MuiSlider-thumb': { width: 12, height: 12 },
                                }}
                            />
                        </div>
                    )}
                </span>


            </div>

            <audio loop preload="auto" ref={audioRef}>
                <source src="/reverie.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}