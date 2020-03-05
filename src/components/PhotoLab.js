import React from "react";
import "../SideBar.css"
import Sidebar from "./sidebar/SideBar"
import Navbar from "./navbar/Navbar";
import ApplicationViews from "./ApplicationViews";

const PhotoLab = () => {
    return (
        <>
        <Sidebar />
        <Navbar />
        <ApplicationViews />

        </>
    )
}
export default PhotoLab;