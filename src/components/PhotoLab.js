import React from "react";
import "../SideBar.css"
import Sidebar from "./sidebar/SideBar"
import Navbar from "./navbar/Navbar";
import ApplicationViews from "./ApplicationViews";
import "./PhotoLab.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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