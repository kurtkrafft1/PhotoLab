import React from "react";
import withRouter, { NavLink} from "react-router-dom"
import './NavBar.css';

const Navbar = props => {
    return (
        <header>
             <div className="userInfo">
            
            </div>
            <div className="bar">
            <NavLink to="/">
            <h1>PH<i className="camera retro icon"></i>TOLAB</h1>
            </NavLink>
            <div className="navLinks">
            <NavLink className="navItem" to="/myphotos">My Photos</NavLink>
            <p className="bar">|</p>
            <NavLink className="navItem" to="/friends">Friends</NavLink>
            <p className="bar">|</p>
            <NavLink className="navItem" to="/explore">Explore</NavLink>
            <p className="bar">|</p>
            <NavLink className="navItem" to="/login">Logout</NavLink>
       
            </div>
            </div>
           
        </header>
    )
}
export default Navbar;