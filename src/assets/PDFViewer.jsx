import {useState, useRef, useEffect, useLayoutEffect} from "react";
import {pdfjs} from "react-pdf";
import pdfFile from "../22BCE1020-Report.pdf";
import Rotate from "./icons/rotate.jsx";
import Menu from "./icons/Menu.jsx";
import PDFDocument from "./pdf/PDFDocument.jsx";
import LeftMenu from "./pdf/LeftMenu.jsx";
import RightMenu from "./pdf/RightMenu.jsx";
import Clock from "./icons/Clock.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(100);
    const [angle, setAngle] = useState(0);
    const [topOffset, setTopOffset] = useState(0);
    const [leftMenuOpen, setLeftMenuOpen] = useState(true);
    const [rightMenuOpen, setRightMenuOpen] = useState(true);
    const [pagesFinished, setPagesFinished] = useState([]);
    const [pagesDone, setPagesDone] = useState(0)


    const pageRefs = useRef([]);
    const taskbarRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(600);
    const [totalTime, setTotalTime] = useState(600);
    const [isActive, setIsActive] = useState(true);
    const [isPause, setIsPause] = useState(false);

    useEffect(() => {
        let timeInterval;
        if (isActive && !isPause) {
            timeInterval = setInterval(() => {
                setCurrentTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timeInterval);
    }, [isActive, isPause]);

    useLayoutEffect(() => {
        if (taskbarRef.current) {
            setTopOffset(taskbarRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        setPagesFinished(Array(numPages).fill(false));
    }, [numPages])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                let mostVisible = null;
                let highestRatio = 0;

                entries.forEach(entry => {
                    if (entry.intersectionRatio > highestRatio) {
                        highestRatio = entry.intersectionRatio;
                        mostVisible = entry.target;
                    }
                });

                if (mostVisible) {
                    const pageIndex = Number(mostVisible.dataset.pageNumber);
                    if (pageIndex !== pageNumber) {
                        setPageNumber(pageIndex);
                    }
                }
            },
            {
                threshold: [0.5],
                rootMargin: "0px 0px -20% 0px"
            }
        );

        pageRefs.current.forEach(ref => observer.observe(ref));

        return () => observer.disconnect();
    }, [numPages]);

    const changePageFinish = (index) => {
        setPagesFinished(pagesFinished.map((item, i) => i === index ? !item : item));

        !pagesFinished[index] ? setPagesDone(pagesDone + 1) : setPagesDone(pagesDone - 1);
    }

    const replayFunction = () => {
        setCurrentTime(totalTime);
        setIsPause(false);
    }

    const playFunction = () => {
        setIsPause(false);
    }

    const pauseFunction = () => {
        setIsPause(true);
    }

    const extendTime = (extraSeconds) => {
        setTotalTime((prev) => prev + extraSeconds);
        setCurrentTime((prev) => prev + extraSeconds);
    }

    return (
        <div className="w-screen h-screen bg-transparent flex flex-col rajdhani">

            <div ref={taskbarRef}
                 className="z-[99] w-screen bg-[#161616]/50 text-white py-6 px-5 border-b border-[#222222] flex items-center">

                <span onClick={() => setLeftMenuOpen(!leftMenuOpen)} className={`cursor-pointer`}>
                    <Menu width={30} height={30} color={"white"}/>
                </span>
                <div className={`mx-5 text-4xl font-medium text-gray-500 cursor-default`}>|</div>
                <div className={`text-xl mr-5 cursor-default`}>File Name</div>

                <div className={`ml-auto text-xl flex items-center`}>
                    <div
                        className={`bg-[#161616] px-3 py-1 border border-[#222222]`}>{String(pageNumber).padStart(3, '0')}</div>
                    <div className={'mx-1'}>/</div>
                    <div className={``}>{String(numPages).padStart(3, '0')}</div>
                </div>

                <div className={`mx-5 text-4xl font-medium text-gray-500`}>|</div>
                <div className={`text-xl flex items-center`}>
                    <div className={`text-3xl mr-2 cursor-pointer font-medium`} onClick={() => setScale(scale + 5)}>+
                    </div>
                    <div
                        className={`bg-[#161616] px-3 py-1 border border-[#222222]`}>{String(scale).padStart(3, '0')}</div>
                    <div className={`text-3xl ml-2 cursor-pointer font-medium`} onClick={() => setScale(scale - 5)}>-
                    </div>
                </div>

                <div className={`mx-5 text-4xl font-medium text-gray-500`}>|</div>
                <span className="cursor-pointer" onClick={() => setAngle(angle + 90)}>
                    <Rotate width={30} height={30} color={"white"}/>
                </span>

                <div className={`mx-5 text-4xl font-medium text-gray-500`}>|</div>
                <span onClick={() => setRightMenuOpen(!rightMenuOpen)} className={`cursor-pointer`}>
                    <Clock width={30} height={30} color={"white"}/>
                </span>

            </div>

            <LeftMenu numPages={numPages} pagesDone={pagesDone} leftMenuOpen={leftMenuOpen}
                      changePageFinish={changePageFinish} pagesFinished={pagesFinished} topOffset={topOffset}
                      currentTime={currentTime} totalTime={totalTime}/>

            <RightMenu topOffset={topOffset} currentTime={currentTime} totalTime={totalTime} isPause={isPause}
                       replayFunction={replayFunction} extendTime={extendTime} playFunction={playFunction}
                       pauseFunction={pauseFunction} rightMenuOpen={rightMenuOpen}/>

            <div
                className="z-[99] relative w-screen grow overflow-y-auto flex flex-col items-center py-2 bg-[transparent]">

                <PDFDocument pdfFile={pdfFile} setNumPages={setNumPages} numPages={numPages} pageRefs={pageRefs}
                             scale={scale} angle={angle}/>
            </div>
        </div>
    );
}
