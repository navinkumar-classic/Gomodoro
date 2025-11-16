import LinearProgress from "@mui/material/LinearProgress";
import {useEffect, useState} from "react";

export default function LeftMenu({ numPages, pagesFinished, pagesDone, changePageFinish, topOffset, leftMenuOpen, currentTime, totalTime}) {
    const [avgTime, setAvgTime] = useState(0);

    useEffect(() => {
        setAvgTime((totalTime - currentTime) / (pagesDone * 60));
    },[pagesDone])
    return(
        <div
            className={`${leftMenuOpen ? "visible" : "hidden"} fixed left-0 p-3 text-white z-[100] bg-[#161616]/50 border-r border-[#222222] w-[20vw] overflow-y-auto flex flex-col`}
            style={{top: topOffset, height: `${window.innerHeight - topOffset}px`}}
        >
            <div className={`grow`}>
                <div className={`flex flex-wrap gap-2 mb-5 items-center justify-center`}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <div
                            key={index}
                            className={`${pagesFinished[index] ? "bg-green-800/50" : "bg-red-800/50"} rounded-full text-sm border border-[#bbbbbb] w-8 h-8 flex items-center justify-center cursor-pointer`}
                            onClick={() => changePageFinish(index)}
                        >
                            <div>{String(index + 1).padStart(2, '0')}</div>
                        </div>
                    ))}
                </div>

                <LinearProgress variant="determinate" value={pagesDone * 100 / numPages} color="success"/>
                <div className={'flex justify-between items-center'}>
                    <div className={'text-right'}>{(pagesDone * 100 / numPages).toFixed(2)} %</div>
                    <div className={'text-right'}>{pagesDone} / {numPages}</div>
                </div>
            </div>

            <div>
                <div className={`flex justify-between items-center`}>
                    <div>Average Time Per Page:</div>
                    <div className={`bg-[#161616] px-2 py-0.5 rounded-xs border border-[#222222]`}>{avgTime.toFixed(2)} m</div>

                </div>
            </div>

        </div>
    );
}