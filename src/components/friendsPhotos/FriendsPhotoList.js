import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import UserManager from "../../modules/UserManager"
import FriendsPhotoCard from "./FriendsPhotoCard";

const FriendsPhotoList = props => {
    const [friendsPhotos, setFriendsPhotos] = useState([])
    const [friend, setFriend] = useState({})

    useEffect(()=> {
        PhotographyManager.getAllWithId(props.friendId).then(photosFromApi=> {
            console.log('friends photos', photosFromApi)
            setFriendsPhotos(photosFromApi)
        }).then(()=> {
            console.log(props.friendId)
            UserManager.getUserInfo(props.friendId).then(friendFromAPi=> {
                console.log(friendFromAPi)
                setFriend(friendFromAPi[0])
            })
        })
    },[props.friendId])

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
            <div className="profile-header">
            <picture>
                <img src={friend.profPic} alt='your friend' id="friend-main-profile-picture" />
            </picture>
            <h1>{friend.username}</h1>
            </div>
            <div className="about me">
                <p>{friend.aboutMe}</p>
            </div>
        </div>
        <div className="friend-photos-container">
            {friendsPhotos.map(photo=> {
                return <FriendsPhotoCard key={photo.id} photo={photo} {...props}/>
            })}
        </div>
        </>
    )
}
export default FriendsPhotoList;
