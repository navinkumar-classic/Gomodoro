import {useState} from "react";
import Task from "./Task.jsx";
import CompletedTask from "./CompletedTask.jsx";

export default function TaskManager({currentTask, completedTask, deleteTask}) {
    const [isOngoing, setIsOngoing] = useState(true);
    return (
        <div className={`bg-[#161616]/70 backdrop-blur-[4px] rounded-3xl grow flex flex-col p-6`}>
            <div className={`bg-[#4D4D4D]/50 backdrop-blur-[2px] rounded-xl flex lg:flex-row flex-col text-2xl rajdhani font-black uppercase mb-3`}>
                <div className={`basis-1/2 ${isOngoing? "bg-[#FF5959]" : "bg-transparent" } rounded-xl py-5 flex justify-center items-center cursor-pointer`}
                     onClick={() => setIsOngoing(!isOngoing)}>
                    Ongoing Tasks
                </div>
                <div className={`basis-1/2 ${isOngoing? "bg-transparent" : "bg-[#FF5959]"} rounded-xl py-5 flex justify-center items-center cursor-pointer`}
                     onClick={() => setIsOngoing(!isOngoing)}>
                    Completed Tasks
                </div>
            </div>
            {
                isOngoing ? (
                        <div>
                            {currentTask.map((task, index) => {
                                return <Task key = {index} task={task.label} totalTime={task.totalTime} deleteFunction={() => deleteTask(index)} />
                            })}
                        </div>
                ) : (
                    <div>
                        {completedTask.map((task, index) => {
                            return <CompletedTask key = {index} task={task.label} totalTime={task.totalTime} />
                        })}
                    </div>
                )
            }
        </div>
    );
}