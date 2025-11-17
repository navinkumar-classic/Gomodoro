import {useState, useRef, useEffect, useLayoutEffect} from "react";
import {pdfjs} from "react-pdf";
import PDFDocument from "./pdf/PDFDocument.jsx";
import LeftMenu from "./pdf/LeftMenu.jsx";
import RightMenu from "./pdf/RightMenu.jsx";
import TaskBar from "./pdf/TaskBar.jsx";
import DragAndDropFilePicker from "./pdf/DragAndDropFilePicker.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfName, setPdfName] = useState("None.pdf");
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [scale, setScale] = useState(100);
    const [angle, setAngle] = useState(0);
    const [topOffset, setTopOffset] = useState(0);
    const [leftMenuOpen, setLeftMenuOpen] = useState(true);
    const [rightMenuOpen, setRightMenuOpen] = useState(true);
    const [pagesFinished, setPagesFinished] = useState([]);
    const [pagesDone, setPagesDone] = useState(0)


    const pageRefs = useRef([]);
    const taskbarRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
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
        if (!numPages) return;

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
                    setPageNumber(pageIndex);
                }
            },
            {
                threshold: [0.5],
                rootMargin: "0px 0px -20% 0px"
            }
        );

        pageRefs.current
            .filter(Boolean)
            .forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [numPages, pdfFile]);

    const isMobile = window.innerWidth < 768;

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

    const setTimer = (seconds) => {
        setTotalTime(seconds);
        setCurrentTime(seconds);
        setIsPause(true);
        setIsActive(true);
    }

    const setTimerMenu = () => {
        setIsActive(false);
        setCurrentTime(0);
        setTotalTime(0);
    }

    const handleFiles = (files) => {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setNumPages(null);
            setPageNumber(1);
            pdfjs.getDocument(reader.result).promise.then((pdf) => {
                setNumPages(pdf.numPages);
            });
            setPdfFile(file);
            setPdfName(file.name);
        };
    }

    const clearPdfFile = () => {
        setPdfFile(null);
        setPdfName("None.pdf");
        setNumPages(0);
        setPageNumber(0);
        setPagesDone(0);
    }

    return (
        <div className="w-screen h-screen bg-transparent flex flex-col rajdhani">

            <TaskBar ref={taskbarRef} numPages={numPages} pagesDone={pagesDone} pagesFinished={pagesFinished}
                     angle={angle} leftMenuOpen={leftMenuOpen} currentTime={currentTime} totalTime={totalTime}
                     rightMenuOpen={rightMenuOpen} setAngle={setAngle} setLeftMenuOpen={setLeftMenuOpen}
                     setRightMenuOpen={setRightMenuOpen} pageNumber={pageNumber} taskbarRef={taskbarRef} scale={scale}
                     setScale={setScale} pdfName={pdfName} clearPdfFile={clearPdfFile}/>

            <LeftMenu numPages={numPages} pagesDone={pagesDone} leftMenuOpen={leftMenuOpen}
                      changePageFinish={changePageFinish} pagesFinished={pagesFinished} topOffset={topOffset}
                      currentTime={currentTime} totalTime={totalTime}/>

            <RightMenu topOffset={topOffset} currentTime={currentTime} totalTime={totalTime} isPause={isPause}
                       replayFunction={replayFunction} extendTime={extendTime} playFunction={playFunction}
                       pauseFunction={pauseFunction} rightMenuOpen={rightMenuOpen} setTimer={setTimer}
                       setTimerMenu={setTimerMenu} isActive={isActive} />

            <div className="fixed bottom-0 right-0 left-0 text-white z-[102] flex items-center justify-center">
                <div className={`bg-[#161616]/70 border-1 border-b-0 border-[#222222] px-4 py-2 text-2xl jetbrains-mono ${(isMobile && (rightMenuOpen || leftMenuOpen)) ? "hidden" : ""}`}>
                    {String(Math.floor(currentTime / 60)).padStart(2, "0")}:
                    {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </div>
            </div>

            <div
                className={`z-[99] relative w-screen grow overflow-y-auto flex flex-col items-center py-2 bg-[transparent] ${pdfFile ? "" : "justify-center"}`}>

                { pdfFile ? (
                    <PDFDocument pdfFile={pdfFile} setNumPages={setNumPages} numPages={numPages} pageRefs={pageRefs}
                                 scale={scale} angle={angle} pagesFinished={pagesFinished} changePageFinish={changePageFinish}/>
                ):(
                    <DragAndDropFilePicker
                        accept={{
                            "application/pdf": [".pdf"],
                        }}
                        onFiles={handleFiles}
                    />
                )}

            </div>
        </div>
    );
}
