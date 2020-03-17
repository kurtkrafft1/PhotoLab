import React, { useState} from "react";
import "../SideBar.css"
import Sidebar from "./sidebar/SideBar"
import Navbar from "./navbar/Navbar";
import ApplicationViews from "./ApplicationViews";
import "./PhotoLab.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const PhotoLab = props => {
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());
    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
      }
  
    const setUser = user => {
      sessionStorage.setItem("credentials", JSON.stringify(user));
      setHasUser(isAuthenticated());
    } 
    return (
        <>
      <Sidebar hasUser={hasUser} clearUser={clearUser} />
        <Navbar hasUser={hasUser} clearUser={clearUser} />
        <ApplicationViews  hasUser={hasUser} setUser={setUser}/>

        </>
    )
}
export default PhotoLab;