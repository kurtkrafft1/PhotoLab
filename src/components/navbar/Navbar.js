import React, { useState, useEffect } from "react";
// import withRouter, { NavLink} from "react-router-dom"
import { Route , withRouter, NavLink} from 'react-router-dom';
import './NavBar.css';
import FriendsManager from "../../modules/FriendsManager"
const Navbar = props => {

    const user= JSON.parse(sessionStorage.getItem('credentials'))

    const handleLogout = () => {
        props.clearUser();
       window.href="/"
      }
  
    
    if(props.hasUser){
        return (
            <header>
                  
           
           <div className="header-word">
               
               <div className="div-test">
               <div></div>
               <NavLink to="/" className="home-title"><h1 className="title-home-logged">PH<i className="camera retro icon"></i>TOLAB</h1>  </NavLink>
           <div className="userInfo">
                <p>{user.username}</p>
                <picture>
                    <img src={user.profPic} alt="you!" className="profPicIcon" onClick={()=> props.history.push('/myprofile')}/>
                </picture>
                {props.hasRequests===true ? ( <i className="exclamation circle icon"></i> ): (null)}
            </div>
            </div>
            </div>
         
           <div className="navLinks">
           <NavLink className="navItem" activeClassName='navItem-active' to="/myphotos">My Photos</NavLink>
           <p className="bar">|</p>
           <NavLink className="navItem" activeClassName='navItem-active'  to="/friends">Friends</NavLink>
           <p className="bar">|</p>
           <NavLink className="navItem" activeClassName='navItem-active'  to="/explore">Explore</NavLink>
           <p className="bar">|</p>
           <NavLink className="navItem"  to="/" onClick={ handleLogout}>Logout</NavLink>
      
           </div>
          
       </header>
        )
    }else {
    return (
        <header>
             <div className="userInfo">
            
            </div>
            <div className="header-word">
               <div className="div-test-2">
                   <div></div>
               <NavLink to="/" className="home-title"><h1 className="title-home">PH<i className="camera retro icon"></i>TOLAB</h1>  </NavLink>
               <div></div>
            </div>
            </div>
           
        </header>
    )}
}
export default withRouter(Navbar);  

{/* <i class="exclamation circle icon"></i> */}