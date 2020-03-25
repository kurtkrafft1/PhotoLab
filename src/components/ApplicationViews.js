import { Route, Redirect } from "react-router-dom";
import React from "react";
import MyPhotoList from "./myPhotos/MyPhotoList";
import MyPhotoDetails from "./myPhotos/MyPhotoDetails";
import FriendsList from "./friendsPhotos/FriendsList";
import FriendsPhotoList from "./friendsPhotos/FriendsPhotoList";
import FriendsPhotoDetails from "./friendsPhotos/FriendsPhotoDetails"
import HomeList from "../home/HomeList";
import ExploreList from "./explore/ExploreList";
import Login from "./auth/Login"
import CreateCardForm from "./createform/CreateCardForm";
import StarredPhotos from './myPhotos/StarredPhotos';
import MyProfile from "./myProfile/MyProfile"
import NewProfilePicture from "./myProfile/NewProfilePicture"

const ApplicationViews = props => {
    const setUser = props.setUser;
    const hasUser = props.hasUser
    const hasRequests = props.hasRequests
    const setHasRequests = props.setHasRequests
    const setRefreshNav = props.setRefreshNav
    const refreshNav = props.refreshNav

    return (
        <>
        <Route 
        exact path ="/login"
        render={props=> {
            return <Login {...props} setUser={setUser}/>
        }}
        />
        <Route 
        exact path = "/create"
        render={props => {
            return <CreateCardForm {...props} hasUser={hasUser} setUser={setUser} />
        }}
        />
        <Route
        exact path="/myphotos"
        render={props=>{
            if(hasUser){
                return <MyPhotoList {...props}/>
            }else {
                return <Redirect to="/login" />
            }
            
            
        }}
        />
        <Route 
        path="/myphotos/:photoId(\d+)"
        render={props=> {
            if(hasUser){
                return <MyPhotoDetails photoId={parseInt(props.match.params.photoId)} {...props} />
            }else {
                return <Redirect to="/login" />
            }
            
        }}
        />
        <Route
        exact path="/friends"
        render={props=> {
            if(hasUser){
                return <FriendsList {...props} />
            }else {
                return <Redirect to="/login" />
            }
            
        }}
        />
        <Route 
        exact path="/"
        render={props=> {
            return <HomeList {...props} hasUser={hasUser}/>
        }}
        />
        <Route 
        exact path = "/friends/photos/:friendId(\d+)"
        render={props=> {
            if(hasUser){
                return <FriendsPhotoList friendId={parseInt(props.match.params.friendId)} {...props} />
         
            }else {
                return <Redirect to="/login" />
            }
            
        }}
        />
        <Route 
        exact path = "/friends/photos/details/:photoId(\d+)"
        render={props=> {
            if(hasUser){
                return <FriendsPhotoDetails photoId={parseInt(props.match.params.photoId)} {...props} />
            }else {
                return <Redirect to="/login" />
            }
            
        }}
        />
        <Route 
         path = "/explore"
        render={props => {
            if(hasUser){
                return <ExploreList {...props} />
            }else {
                return <Redirect to="/login" />
            }
         
        }}
        />
        <Route 
        path="/starred"
        render={props=> {
            if(hasUser){
                return <StarredPhotos {...props} />
            }else {
                return <Redirect to="/login" />
            }
        }}
        />
        <Route
        path="/myprofile"
        render={props => {
            if(hasUser){
                return <MyProfile {...props} hasRequests={hasRequests} setHasRequests={setHasRequests} refreshNav={refreshNav} setRefreshNav={setRefreshNav}/>
            } else {
                return <Redirect to ="/login" />
            }
        }}
        />
        <Route 
        path="/editProfilePicture"
        render={props=> {
            if(hasUser){
                return <NewProfilePicture {...props} setUser={setUser} />
            } else {
                return <Redirect to="/login" />
            }
        }}
        />
        </>

    )
}
export default ApplicationViews;