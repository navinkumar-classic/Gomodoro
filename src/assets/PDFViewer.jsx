import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "../22BCE1020-Report.pdf";
import Rotate from "./icons/rotate.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(100);
    const [angle, setAngle] = useState(0);
    const pageRefs = useRef([]);

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
                threshold: Array.from({ length: 100 }, (_, i) => i / 100),
                rootMargin: "0px 0px -50% 0px"
            }
        );

        pageRefs.current.forEach(ref => observer.observe(ref));

        return () => observer.disconnect();
    }, [numPages]);

    return (
        <div className="w-screen h-screen bg-transparent flex flex-col rajdhani">

            <div className="z-[99] w-screen bg-[#161616]/50 text-white py-6 px-5 border-b border-[#222222] flex items-center">
                <div className={`text-xl mr-5`}>File Name</div>

                <div className={`ml-auto text-xl flex items-center`}>
                    <div className={`bg-[#161616] px-3 py-1 border border-[#222222]`}>{String(pageNumber).padStart(3,'0')}</div>
                    <div className={'mx-1'}>/</div>
                    <div className={``}>{String(numPages).padStart(3,'0')}</div>
                </div>

                <div className={`mx-5 text-4xl font-medium text-gray-500`}>|</div>
                <div className={`text-xl flex items-center`}>
                    <div className={`text-3xl mr-2 cursor-pointer font-medium`} onClick={()=> setScale(scale + 5)}>+</div>
                    <div className={`bg-[#161616] px-3 py-1 border border-[#222222]`}>{String(scale).padStart(3,'0')}</div>
                    <div className={`text-3xl ml-2 cursor-pointer font-medium`} onClick={()=> setScale(scale - 5)}>-</div>
                </div>

                <div className={`mx-5 text-4xl font-medium text-gray-500`}>|</div>
                <span className="cursor-pointer" onClick={()=> setAngle(angle + 90)}>
                    <Rotate width={30} height={30} color={"white"}/>
                </span>


            </div>

            <div className="z-[99] relative w-screen grow overflow-y-auto flex flex-col items-center py-10 bg-[transparent]">

                <Document
                    file={pdfFile}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div
                            key={index}
                            ref={el => (pageRefs.current[index] = el)}
                            data-page-number={index + 1}
                            className="my-8 bg-white p-2 rounded-xs"
                            style={{ width: "fit-content" }}
                        >
                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                canvasBackground="white"
                                scale={scale/100}
                                rotate={angle}
                            />
                        </div>
                    ))}
                </Document>

            </div>
        </div>
    );
}
