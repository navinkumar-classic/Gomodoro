import './App.css';
import PomodoroSection from "./assets/PomodoroSection.jsx";
import PDFViewer from "./assets/PDFViewer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function PDFPage() {

    return (
        <>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>

            <PDFViewer />
        </>
    );
}

function PomodoroPage() {

    return (
        <>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>

            <PomodoroSection />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PomodoroPage />} />
                <Route path="/pdf-viewer" element={<PDFPage />} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;
