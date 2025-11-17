import Menu from "../icons/Menu.jsx";
import Rotate from "../icons/rotate.jsx";
import Clock from "../icons/Clock.jsx";

export default function TaskBar({ numPages, pageNumber, scale, angle, leftMenuOpen, setLeftMenuOpen, rightMenuOpen, setRightMenuOpen, taskbarRef, setScale, setAngle}) {

    const openCloseLeftMenu = () => {
        const width = window.innerWidth;

        if (width < 768) {
            if (leftMenuOpen) {
                setLeftMenuOpen(false);
            }
            else {
                setLeftMenuOpen(true);
                setRightMenuOpen(false);
            }
        }
        else {
            setLeftMenuOpen(!leftMenuOpen);
        }
    }

    const openCloseRightMenu = () => {
        const width = window.innerWidth;

        if (width < 768) {
            if (rightMenuOpen) {
                setRightMenuOpen(false);
            }
            else {
                setRightMenuOpen(true);
                setLeftMenuOpen(false);
            }
        }
        else {
            setRightMenuOpen(!rightMenuOpen);
        }
    }

    return(
        <div ref={taskbarRef}
             className="z-[99] w-screen bg-[#161616]/50 text-white py-6 px-5 border-b border-[#222222] flex items-center">

                <span onClick={() => openCloseLeftMenu()} className={`cursor-pointer`}>
                    <Menu width={30} height={30} color={"white"}/>
                </span>
            <div className={`hidden md:block md:mx-5 mx-2 text-4xl font-medium text-gray-500 cursor-default`}>|</div>
            <div className={`text-xl hidden md:block mr-5 cursor-default`}>File Name</div>

            <div className={`ml-auto md:text-xl text-lg flex items-center`}>
                <div className={`md:text-3xl text-xl mr-2 cursor-pointer font-medium`} onClick={() => setScale(scale + 5)}>+
                </div>
                <div
                    className={`bg-[#161616] md:px-3 px-1.5 py-1 border border-[#222222]`}>{String(scale).padStart(3, '0')}</div>
                <div className={`md:text-3xl text-xl ml-2 cursor-pointer font-medium`} onClick={() => setScale(scale - 5)}>-
                </div>
            </div>

            <div className={`md:mx-5 mx-2 text-4xl font-medium text-gray-500`}>|</div>

            <div className={`md:text-xl text-lg flex items-center`}>
                <div
                    className={`bg-[#161616] md:px-3 px-1.5 py-1 border border-[#222222]`}>{String(pageNumber).padStart(3, '0')}</div>
                <div className={'mx-1'}>/</div>
                <div className={``}>{String(numPages).padStart(3, '0')}</div>
            </div>


            <div className={`md:mx-5 mx-2 text-4xl font-medium text-gray-500`}>|</div>
            <span className="cursor-pointer" onClick={() => setAngle(angle + 90)}>
                    <Rotate width={25} height={25} color={"white"}/>
                </span>

            <div className={`md:mx-5 mx-2 text-4xl font-medium text-gray-500`}>|</div>
            <span onClick={() => openCloseRightMenu()} className={`cursor-pointer`}>
                    <Clock width={25} height={25} color={"white"}/>
                </span>

        </div>
    );
}