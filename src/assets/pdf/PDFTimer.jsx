import {useEffect, useState} from "react";

export default function PDFTimer({currentTime, totalTime}) {
    const [radius, setRadius] = useState(120);
    const [progress, setProgress] = useState((totalTime - currentTime)*100/totalTime);
    const stroke = 14;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        setProgress((totalTime - currentTime)*100/totalTime);
    }, [currentTime, totalTime]);

    return(
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
                <div className="text-5xl font-bold jetbrains-mono mt-2 tabular-nums">
                    {String(Math.floor(currentTime / 60)).padStart(2, "0")}:
                    {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </div>
            </div>
        </div>
    );
}