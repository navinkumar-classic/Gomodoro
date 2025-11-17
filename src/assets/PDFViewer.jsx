import {useState, useRef, useEffect, useLayoutEffect} from "react";
import {pdfjs} from "react-pdf";
import pdfFile from "../22BCE1020-Report.pdf";
import PDFDocument from "./pdf/PDFDocument.jsx";
import LeftMenu from "./pdf/LeftMenu.jsx";
import RightMenu from "./pdf/RightMenu.jsx";
import TaskBar from "./pdf/TaskBar.jsx";

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
    const isActive = true;
    const [isPause, setIsPause] = useState(false);

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 768) {
            setLeftMenuOpen(false);
            setRightMenuOpen(false);
            setScale(55);
        }
    }, [])

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

            <TaskBar ref={taskbarRef} numPages={numPages} pagesDone={pagesDone} pagesFinished={pagesFinished}
                     angle={angle} leftMenuOpen={leftMenuOpen} currentTime={currentTime} totalTime={totalTime}
                     rightMenuOpen={rightMenuOpen} setAngle={setAngle} setLeftMenuOpen={setLeftMenuOpen}
                     setRightMenuOpen={setRightMenuOpen} pageNumber={pageNumber} taskbarRef={taskbarRef} scale={scale}
                     setScale={setScale}/>

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
