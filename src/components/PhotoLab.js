import React, { useState, useEffect } from "react";
import "../SideBar.css"
import Sidebar from "./sidebar/SideBar"
import Navbar from "./navbar/Navbar";
import ApplicationViews from "./ApplicationViews";
import FriendsManager from "../modules/FriendsManager"
import "./PhotoLab.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const PhotoLab = props => {
  const [hasRequests, setHasRequests] = useState(false)
  const [refreshNav, setRefreshNav] = useState(false)
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());
    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
        setRefreshNav(!refreshNav)
      }
  
    const setUser = user => {
      sessionStorage.setItem("credentials", JSON.stringify(user));
      setHasUser(isAuthenticated());
      setRefreshNav(!refreshNav)
    } 
    useEffect(()=> {
      if(hasUser){

      const user = JSON.parse(sessionStorage.getItem('credentials'))
    FriendsManager.getAllRequests(user.id).then(arr=> {
        if(arr.length>0){
            setHasRequests(true)
        } else {
            setHasRequests(false)
        }
    })}

  }, [refreshNav])
    return (
        <>
      <Sidebar hasUser={hasUser} clearUser={clearUser} />
        <Navbar hasUser={hasUser} clearUser={clearUser}  hasRequests={hasRequests} setHasRequests={setHasRequests}/>
        <ApplicationViews  hasUser={hasUser} setUser={setUser}  hasRequests={hasRequests} setHasRequests={setHasRequests} refreshNav={refreshNav} setRefreshNav={setRefreshNav}/>

        </>
    )
}
export default PhotoLab;