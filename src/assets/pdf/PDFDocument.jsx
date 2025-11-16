import pdfFile from "../../22BCE1020-Report.pdf";
import {Document, Page} from "react-pdf";

export default function PDFDocument({pdfFile, setNumPages, numPages, pageRefs, scale, angle}) {
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
                    className="my-8 bg-white p-2 rounded-xs"
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
                </div>
            ))}
        </Document>
    );
}