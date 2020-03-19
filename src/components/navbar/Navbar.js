import React from "react";
// import withRouter, { NavLink} from "react-router-dom"
import { Route , withRouter, NavLink} from 'react-router-dom';
import './NavBar.css';

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
               <NavLink to="/" ><h1 className="title-home">PH<i className="camera retro icon"></i>TOLAB</h1>  </NavLink>
           <div className="userInfo">
                <p>{user.username}</p>
                <picture>
                    <img src={user.profPic} alt="you!" className="profPicIcon" onClick={()=> props.history.push('/myprofile')}/>
                </picture>
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
               <div className="div-test">
               <NavLink to="/" ><h1 className="title-home">PH<i className="camera retro icon"></i>TOLAB</h1>  </NavLink>
            </div>
            </div>
           
        </header>
    )}
}
export default withRouter(Navbar);  