import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";
import MyPhotoDetails from "./myPhotos/MyPhotoDetails";
import FriendsList from "./friendsPhotos/FriendsList";
import FriendsPhotoList from "./friendsPhotos/FriendsPhotoList";
import HomeList from "../home/HomeList";
import FriendsPhotoDetails from "./friendsPhotos/FriendsPhotoDetails"

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
        exact path="/friends"
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
        <Route 
        exact path = "/friends/photos/details/:photoId(\d+)"
        render={props=> {
            return <FriendsPhotoDetails photoId={parseInt(props.match.params.photoId)} {...props} />
        }}
        />
        
        </>

    )
}
export default ApplicationViews;