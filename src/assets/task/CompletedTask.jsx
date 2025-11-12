import Star from "../icons/Star.jsx";
import Clock from "../icons/Clock.jsx";
import Delete from "../icons/Delete.jsx";

export default function CompletedTask({ task, totalTime, taskType}) {
    return(
        <div className={`${taskType === "task" ? "bg-[#4D4D4D]/50" : "bg-[#FF5959]"} backdrop-blur-[2px] rounded-md flex justify-between items-center md:px-4 py-5 px-2 mt-3 overflow-x-auto`}>
            <div className={`flex items-center`}>
                <Star width={30} height={30} color={taskType === "task"? "#FF5959": "#FFFFFF" } />
                <div className={`whitespace-nowrap mr-2 ml-1 md:ml-4 md:text-2xl text-lg font-bold rajdhani`}>
                    {task}
                </div>
            </div>
            <div className={`flex items-center`}>
                <Clock width={35} height={35} color={"white"} />
                <span className={`md:text-2xl text-lg font-black rajdhani md:mr-5 mr-1 ml-2`}>
                    {String(Math.floor(totalTime/60)).padStart(2, "0")}<span className={`font-normal md:text-sm text-xs`}>m</span>&nbsp;
                    {String(totalTime%60).padStart(2, "0")}<span className={`font-normal md:text-sm text-xs`}>s</span>
                </span>
            </div>

        </div>
    );
}