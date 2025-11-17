import {Document, Page} from "react-pdf";

export default function PDFDocument({pdfFile, setNumPages, numPages, pageRefs, scale, angle, pagesFinished, changePageFinish}) {
    return(
        <Document
            file={pdfFile}
            onLoadSuccess={({numPages}) => setNumPages(numPages)}
        >
            {Array.from(new Array(numPages), (el, index) => (
                <div
                    key={index}
                    ref={el => (pageRefs.current[index] = el)}
                    data-page-number={index + 1}
                    className="my-8 bg-white p-2 rounded-xs relative"
                    style={{width: "fit-content"}}
                >
                    <Page
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        canvasBackground="white"
                        scale={scale / 100}
                        rotate={angle}
                    />

                    <div className={`${pagesFinished[index] ? "bg-green-500/80" : "bg-red-500/80"}  absolute top-2 right-2 rounded-full text-sm border border-[#888888] text-white w-8 h-8 flex items-center justify-center cursor-pointer`}
                        onClick={() => changePageFinish(index)}>
                        {!pagesFinished[index] ? "✕": "✓"}
                    </div>
                </div>
            ))}
        </Document>
    );
}