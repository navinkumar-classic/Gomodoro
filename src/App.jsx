import './App.css'
import TaskSection from "./assets/TaskSection.jsx";
import TimerSection from "./assets/TimerSection.jsx";
import {useEffect, useState} from "react";
import NewTask from "./assets/task/NewTask.jsx";

function App() {
    const [currentTime, setCurrentTime] = useState(-1);
    const [totalTime, setTotalTime] = useState(-1);

    const [isActive, setIsActive] = useState(true);
    const [isPause, setIsPause] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [startTask, setStartTask] = useState(true);

    const [currentTask, setCurrentTask] = useState([{label: "Data Structure", totalTime: 11}, {label: "Algorthims", totalTime: 9}]);
    const [completedTask, setCompletedTask] = useState([]);

    const [timerText, setTimerText] = useState("No Tasks!!!");

    const deleteTask = (index) => {
        setCurrentTask(currentTask.filter((task, i) => i !== index));
    }
    useEffect(() => {
        let timeInterval;

        if (isActive && !isPause){
            timeInterval = setInterval(() => {
                setCurrentTime((prev)=>{
                    if (prev > 0) return prev - 1;
                    return 0;
                })

            }, 1000)
        }

        return () => clearInterval(timeInterval);
    }, [isActive, isPause]);

    useEffect(() => {
        if (currentTask.length === 0) {
            setTimerText("No Tasks!!!");
            setCurrentTime(0);
            setTotalTime(0);
            return;
        }

        if (currentTime === -1) {
            const next = currentTask[0];
            setTotalTime(next.totalTime);
            setCurrentTime(next.totalTime);
            setTimerText("Start Task: " + next.label);
            setIsPause(true);
        }
        else if (currentTime === 0) {
            const finished = currentTask[0];
            const remaining = currentTask.slice(1);
            setCompletedTask(prev => [...prev, finished]);
            setCurrentTask(remaining);

            if (remaining.length > 0) {
                const next = remaining[0];
                setTotalTime(next.totalTime);
                setCurrentTime(next.totalTime);
                setTimerText("Start Task: " + next.label);
                setIsPause(true);
            } else {
                setTimerText("No Tasks!!!");
                setCurrentTime(0);
                setTotalTime(0);
            }
        }
    }, [currentTime, currentTask]);

    const replayFunction = () => {
        setCurrentTime(totalTime);
    }

    const playFunction = () => {
        if (startTask) {
            if (currentTask.length === 0) {
                setTimerText("No Tasks!!!");
            }
            else {
                setTimerText(currentTask[0].label);
            }
            setIsPause(false);
        }
        else{
            setIsPause(false);
        }
    }

    return (
        <>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>

            {addTask ? (
                <NewTask />
            ):(
                <div className={`flex lg:flex-row flex-col-reverse bg-black text-white`}>
                    <TaskSection setAddTask = {setAddTask}
                                 currentTask = {currentTask}
                                 completedTask = {completedTask}
                                 deleteTask = {deleteTask}
                    />
                    <TimerSection currentTime = {currentTime}
                                  totalTime = {totalTime}
                                  pauseFunction = {() => setIsPause(true)}
                                  playFunction = {playFunction}
                                  replayFunction = {replayFunction}
                                  ongoingTask = {timerText}
                    />
                </div>
            )}

        </>
  )
}

export default App
