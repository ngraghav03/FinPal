import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function NavigationBars() {
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-[15%_85%]">
                <Sidebar className=""/>
                <Outlet className=""/>
            </div>
            
        </>
    )
}

export default NavigationBars;