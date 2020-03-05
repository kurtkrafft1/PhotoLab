import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";

const ApplicationViews = () => {
    
    return (
        <Route
        path="/myphotos"
        render={props=>{
            return <MyPhotoList {...props}/>
            
        }}
        />
    )
}
export default ApplicationViews;