import './App.css';
import TaskSection from "./assets/TaskSection.jsx";
import TimerSection from "./assets/TimerSection.jsx";
import { useEffect, useState } from "react";
import NewTask from "./assets/task/NewTask.jsx";

function App() {
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isPause, setIsPause] = useState(false);
    const [addTask, setAddTask] = useState(false);

    const [currentTask, setCurrentTask] = useState([]); // active queue
    const [completedTask, setCompletedTask] = useState([]);

    const [justFinishedTask, setJustFinishedTask] = useState(null); // task waiting for user input
    const [isInitialized, setIsInitialized] = useState(false); // whether the currentTask[0] has been loaded into the timer
    const [timerText, setTimerText] = useState("Add Tasks");

    // delete task from queue
    const deleteTask = (index) => {
        setCurrentTask((prev) => prev.filter((_, i) => i !== index));
    };

    // ticking timer
    useEffect(() => {
        let timeInterval;
        if (isActive && !isPause) {
            timeInterval = setInterval(() => {
                setCurrentTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timeInterval);
    }, [isActive, isPause]);

    // handle initialization and finish transitions
    useEffect(() => {
        // no tasks: reset
        if (!currentTask || currentTask.length === 0) {
            setTimerText("Add Tasks");
            setCurrentTime(0);
            setTotalTime(0);
            setIsInitialized(false);
            setJustFinishedTask(null);
            setIsPause(true);
            return;
        }

        // initialize the timer for the next task (only if not initialized and not currently lingering on a finished task)
        if (!isInitialized && !justFinishedTask) {
            const next = currentTask[0];
            if (next) {
                setTotalTime(next.totalTime);
                setCurrentTime(next.totalTime);
                setTimerText(`Ready: ${next.label}`);
                setIsPause(true); // start in paused "Ready" state
                setIsInitialized(true);
            }
            return;
        }

        // when a running/initialized task reaches zero, mark it finished and linger
        if (currentTime === 0 && isInitialized && !justFinishedTask) {
            const finished = currentTask[0];
            if (finished) {
                setIsPause(true);
                setTimerText(`Finished: ${finished.label}`);
                setJustFinishedTask(finished);
                setIsInitialized(false); // prevent auto-initializing next
            }
        }
    }, [currentTime, currentTask, isInitialized, justFinishedTask]);

    // 🔥 NEW EFFECT: dynamically adjust text while running
    useEffect(() => {
        if (isInitialized && !isPause && currentTask.length > 0 && currentTime > 0) {
            // Timer is actively running → show just the label
            setTimerText(currentTask[0].label);
        } else if (isInitialized && isPause && currentTask.length > 0 && !justFinishedTask) {
            // Timer is paused but task loaded → show "Ready:"
            setTimerText(`Ready: ${currentTask[0].label}`);
        }
    }, [isPause, isInitialized, currentTask, currentTime, justFinishedTask]);

    const replayFunction = () => {
        setCurrentTime(totalTime);
        setIsPause(false);
        setTimerText(currentTask[0].label);
    };

    const playFunction = () => {
        if (justFinishedTask) {
            setIsPause(false);
            setTimerText(justFinishedTask.label);
            setJustFinishedTask(null);
            setIsInitialized(true);
            return;
        }

        if (!isInitialized && currentTask.length > 0) {
            const next = currentTask[0];
            setTotalTime(next.totalTime);
            setCurrentTime(next.totalTime);
            setIsPause(false);
            setTimerText(next.label);
            setIsInitialized(true);
            return;
        }

        setIsPause(false);
    };

    const extendTime = (extraSeconds) => {
        if (justFinishedTask) {
            setTotalTime((prev) => prev + extraSeconds);
            setCurrentTime((prev) => prev + extraSeconds);
            setJustFinishedTask(null);
            setIsInitialized(true);
            return;
        }

        if (isInitialized && currentTask.length > 0) {
            setTotalTime((prev) => prev + extraSeconds);
            setCurrentTime((prev) => prev + extraSeconds);
        }
    };

    const moveToNextTask = () => {
        if (justFinishedTask) {
            const remaining = currentTask.slice(1);
            setCompletedTask((prev) => [...prev, justFinishedTask]);
            setCurrentTask(remaining);
            setJustFinishedTask(null);
            setIsInitialized(false);
            setIsPause(true);
            setTimerText(remaining.length > 0 ? `Ready: ${remaining[0].label}` : "No Tasks!!!");
            return;
        }

        if (isInitialized && currentTask.length > 0) {
            const finished = currentTask[0];
            const remaining = currentTask.slice(1);
            setCompletedTask((prev) => [...prev, finished]);
            setCurrentTask(remaining);
            setIsInitialized(false);
            setIsPause(true);
            setTimerText(remaining.length > 0 ? `Ready: ${remaining[0].label}` : "No Tasks!!!");
        }
    };

    const appendCurrentTask = (type, name, tTime) => {
        const newTask = { label: name, totalTime: tTime, type };

        setCurrentTask((prev) => {
            const updated = [...prev, newTask];

            if (prev.length === 0 && !justFinishedTask) {
                setTotalTime(tTime);
                setCurrentTime(tTime);
                setTimerText(`Ready: ${name}`);
                setIsPause(true);
                setIsInitialized(true);
            }

            return updated;
        });
    };

    return (
        <>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>

            {addTask ? (
                <NewTask
                    exit={() => setAddTask(false)}
                    appendCurrentTask={appendCurrentTask}
                />
            ) : (
                <div className="flex lg:flex-row flex-col-reverse bg-black text-white">
                    <TaskSection
                        setAddTask={setAddTask}
                        currentTask={currentTask}
                        completedTask={completedTask}
                        deleteTask={deleteTask}
                    />
                    <TimerSection
                        currentTime={currentTime}
                        totalTime={totalTime}
                        pauseFunction={() => setIsPause(true)}
                        isPause={isPause}
                        playFunction={playFunction}
                        replayFunction={replayFunction}
                        ongoingTask={timerText}
                        extendTime={extendTime}
                        moveToNextTask={moveToNextTask}
                        justFinishedTask={justFinishedTask}
                    />
                </div>
            )}

            <audio autoPlay>
                <source src="/reverie.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </>
    );
}

export default App;
