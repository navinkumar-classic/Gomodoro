import { useState, useEffect } from "react";

export default function Timer({currentTime, totalTime, ongoingTask}) {
    const [progress, setProgress] = useState((totalTime - currentTime)*100/totalTime);

    useEffect(() => {
        setProgress((totalTime - currentTime)*100/totalTime);
    }, [currentTime, totalTime]);

    const [radius, setRadius] = useState(180);
    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setRadius(150);
            } else if (width < 1024) {
                setRadius(150);
            } else {
                setRadius(180);
            }
        };

        updateRadius(); // run once
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    const stroke = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (

        <div className="flex items-center justify-center bg-transparent">
            <svg
                width={radius * 2 + stroke}
                height={radius * 2 + stroke}
                className="-rotate-90"
            >
                <circle
                    stroke="#44444466"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius}
                    cx={radius + stroke / 2}
                    cy={radius + stroke / 2}
                />
                {/* Progress circle */}
                <circle
                    stroke="url(#grad)" // gradient
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx={radius + stroke / 2}
                    cy={radius + stroke / 2}
                />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b6b" />
                        <stop offset="100%" stopColor="#ffb3b3" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute text-center text-white">
                <div className="text-7xl font-bold jetbrains-mono mt-2 tabular-nums">
                        {String(Math.floor(currentTime / 60)).padStart(2, "0")}:
                        {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </div>
                <div className="text-lg mt-1 poppins italic text-[#9B9B9B]">{ongoingTask}</div>
            </div>
        </div>
    );
}
