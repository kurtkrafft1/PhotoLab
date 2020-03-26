import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import UserManager from "../../modules/UserManager"
import FriendsPhotoCard from "./FriendsPhotoCard";
import "./FriendsProfile.css" ;
import FriendsManager from "../../modules/FriendsManager";

const FriendsPhotoList = props => {
    const [friendsPhotos, setFriendsPhotos] = useState([])
    const [friend, setFriend] = useState({})
    const user = JSON.parse(sessionStorage.getItem('credentials'))
    const [areFriends, setAreFriends] = useState(false)

    useEffect(()=> {
        window.scrollTo(0, 0)
        FriendsManager.getOneApprovedFriendByActiveUserIdAndUserId(user.id, props.friendId).then(friendship=> {
            console.log(friendship)
            if(friendship.length>0){
                setAreFriends(true)
                PhotographyManager.getAllWithId(props.friendId).then(photosFromApi=> {
                    setFriendsPhotos(photosFromApi)
                }).then(()=> {
                    UserManager.getUserInfo(props.friendId).then(friendFromAPi=> {
                        setFriend(friendFromAPi[0])
                    })
                })
               
            }else {
                setAreFriends(false)
            }
        })
     
    },[props.friendId])
    if(areFriends){
    return(
        <>
        <div className="button-container">
        <i
              id="icons"
              className=" big arrow alternate circle left icon"
              onClick={() => props.history.push("/friends")}
            ></i>
        </div>
        <div className="friendInfoContainer">
        
            <picture>
                <img src={friend.profPic} alt='your friend' id="friend-main-profile-picture" />
            </picture>
            <div className="profile-user-info">
            <div className="profile-header">
            <h1>{friend.username}</h1>
     
            <div className="about me">
                <p>{friend.aboutMe}</p>
            </div>
            </div>
            </div>
        </div>
        <div className="friend-photos-container">
            {friendsPhotos.map(photo=> {
                return <FriendsPhotoCard key={photo.id} photo={photo} {...props}/>
            })}
        </div>
        </>
    )} else {
return (
    <>
    <div className="button-container">
    <i
          id="icons"
          className=" big arrow alternate circle left icon"
          onClick={() => props.history.push("/friends")}
        ></i>
    </div>
    <div className="friendInfoContainer">
        <div className="center-text">
            <img src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126885_1280.png" alt="no no" id="error-image" />
        <h1>I am sorry, you are not friends with this person yet.</h1>
        </div>
    </div>
   
    </>

)}
}
export default FriendsPhotoList;
