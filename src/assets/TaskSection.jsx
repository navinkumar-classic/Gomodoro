import TaskManager from "./task/TaskManager.jsx";
import Plus from "./icons/Plus.jsx";

export default function TaskSection({setAddTask, currentTask, completedTask, deleteTask}) {
    return(
        <div className={`basis-[60%] h-screen lg:p-24 md:p-12 p-9 flex flex-col z-10`}>
            <TaskManager currentTask={currentTask}
                         completedTask={completedTask}
                         deleteTask={deleteTask}
            />
            <div className={`bg-[#4D4D4D]/50 backdrop-blur-[2px] rounded-full mt-4 flex justify-center items-center`}>
                <div className={`bg-[#FF5959] rounded-full cursor-pointer p-3`} onClick={() => setAddTask(true)}>
                    <Plus width={38} height={38} lineWidth={8}/>
                </div>
            </div>
        </div>
    );
}