import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";
import MyPhotoDetails from "./myPhotos/MyPhotoDetails";
import FriendsList from "./friendsPhotos/FriendsList";
import FriendsPhotoList from "./friendsPhotos/FriendsPhotoList";
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
        <Route 
        exact path = "/friends/photos/:friendId(\d+)"
        render={props=> {
            return <FriendsPhotoList friendId={parseInt(props.match.params.friendId)} {...props} />
        }}
        />
        </>

    )
}
export default ApplicationViews;