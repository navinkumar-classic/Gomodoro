
export default function Plus({width, height, lineWidth, color}) {
    return(
        <svg width={width} height={height} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 5V55M30 30H55M5 30H17.5" stroke={color} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

