import React from "react";
import {slide as Menu } from 'react-burger-menu'

const Sidebar= props => {
    return (
        <Menu>
        <a className = "menu-item" href="/">
            Home
        </a>
        <a className = "menu-item" href="/myphotos">
            My Photos
        </a>
        <a className = "menu-item" href="/friendsphotos">
            Friends Photos
        </a>
        <a className = "menu-item" href="/settings">
            Settings
        </a>
        <a className = "menu-item" href="/login">
            Login
        </a>

        </Menu>
    )
}
export default Sidebar;