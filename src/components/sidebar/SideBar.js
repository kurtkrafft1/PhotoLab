import React from "react";
import {slide as Menu } from 'react-burger-menu'

const Sidebar= props => {
    const handleLogout = () => {
        props.clearUser();
       window.href="/"
      }
    if(props.hasUser){
        return (
            <Menu>
            <a className = "menu-item" href="/">
                Home
            </a>
            <a className = "menu-item" href="/myphotos">
                My Photos
            </a>
            <a className = "menu-item" href="/friends">
                Friends
            </a>
            <a className = "menu-item" href="/explore">
                Explore
            </a>
            <a className = "menu-item" href="/" onClick={handleLogout}>
                Logout
            </a>
            </Menu>
        )
    }else {
    return null
}
}
export default Sidebar;