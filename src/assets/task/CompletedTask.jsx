import Star from "../icons/Star.jsx";
import Clock from "../icons/Clock.jsx";
import Delete from "../icons/Delete.jsx";

export default function CompletedTask({ task, totalTime}) {
    return(
        <div className={`bg-[#4D4D4D]/50 backdrop-blur-[2px] rounded-md flex justify-between items-center px-4 py-5 mt-3`}>
            <div className={`flex items-center`}>
                <Star width={30} height={30} color={"#FF5959"} />
                <div className={`ml-4 text-2xl font-bold rajdhani`}>
                    {task}
                </div>
            </div>
            <div className={`flex items-center`}>
                <Clock width={35} height={35} color={"white"} />
                <span className={`text-2xl font-black rajdhani mr-5 ml-2`}>
                    {String(Math.floor(totalTime/60)).padStart(2, "0")}<span className={`font-normal text-sm`}>m</span>&nbsp;
                    {String(totalTime%60).padStart(2, "0")}<span className={`font-normal text-sm`}>s</span>
                </span>
            </div>

        </div>
    );
}