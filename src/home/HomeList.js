import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import "./Home.css";
const HomeList = (props) => {

  if(props.hasUser) {
    return (
      <div className="home-container">
          <HomeCard {...props}/>
          <div className="button-container-home">
          <button type="button" className="ui inverted primary button" onClick={()=> props.history.push('/explore')}>Explore</button>
          </div>
      </div>
    );
  } else {
  return (
    <div className="home-container">
        <HomeCard />
        <div className="button-container-home">
          <button type="button" className="ui inverted primary button" onClick={()=> props.history.push('/login')}>Sign in</button>
          <button type="button" className="ui inverted primary button" onClick={()=> props.history.push('/create')}>Create an Account</button>

        </div>
    </div>
  );
  }
};

export default HomeList;
