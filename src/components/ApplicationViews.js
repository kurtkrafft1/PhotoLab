import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";
import MyPhotoDetails from "./myPhotos/MyPhotoDetails";


const ApplicationViews = () => {
    
    return (
        <>
        <Route
        exact path="/myphotos"
        render={props=>{
            return <MyPhotoList {...props}/>
            
        }}
        />
        <Route 
        path="/myphotos/:photoId(\d+)"
        render={props=> {
            return <MyPhotoDetails photoId={parseInt(props.match.params.photoId)} {...props} />
        }}
        />
        </>
    )
}
export default ApplicationViews;