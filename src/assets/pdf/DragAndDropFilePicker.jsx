import { useDropzone } from "react-dropzone";
import Document from "../icons/Document.jsx";

export default function DragAndDropFilePicker({ onFiles, accept }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFiles,
        accept,
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`
                border-1 border-[#666666] rounded-xl p-18
                cursor-pointer transition text-white flex flex-col justify-center items-center
                ${isDragActive ? "bg-gray-100" : "bg-transparent"}
            `}
        >
            <input {...getInputProps()} />

            <Document width={100} height={100} color={"#ffffff"}/>

            <div className="text-lg font-medium mt-2">
                {isDragActive ? "Drop the file here" : "Drag & drop a pdf here"}
            </div>

            <div className="text-sm opacity-70">
                or click to browse
            </div>
        </div>
    );
}

