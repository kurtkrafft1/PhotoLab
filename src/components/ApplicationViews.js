import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";
import MyPhotoDetails from "./myPhotos/MyPhotoDetails";
import FriendsList from "./friendsPhotos/FriendsList";
import HomeList from "../home/HomeList";


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
        <Route
        path="/friends"
        render={props=> {
            return <FriendsList {...props} />
        }}
        />
        <Route 
        exact path="/"
        render={props=> {
            return <HomeList {...props}/>
        }}
        />
        </>

    )
}
export default ApplicationViews;