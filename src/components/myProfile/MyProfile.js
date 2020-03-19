import React, { useState, useEffect } from 'react'
import FriendsManager from "../../modules/FriendsManager"
import FriendRequestCard from "./FriendRequestCard";
import "./MyProfile.css";

const MyProfile = props => {
    const user = JSON.parse(sessionStorage.getItem('credentials'))
    const [requests, setRequests] = useState([])
    const [refresh, setRefresh] = useState(false)

    const AcceptRequest = (requestId) => {
        console.log('accepting')
        FriendsManager.updateExistingFriendRequestToAccepted(requestId).then(obj=> {
            const newFriend = {
                activeUserId: user.id,
                userId: obj.activeUserId,
                statusId: 1
            }
            FriendsManager.makeNewFriendRequest(newFriend).then(()=> {
                setRefresh(!refresh)
            })
        })
    }


    useEffect(()=> {
        FriendsManager.getAllRequests(user.id).then(setRequests)
        console.log(requests)
    }, [refresh])


    return (
        <>
          <div className="profile-edit-icon">
            <i className="big edit outline icon" id="icons"></i>
            </div>
        <div className="profile-container">
          
            <div className="main-photo">
                <picture>
                    <img src={user.profPic} alt="hey, its you!" id="user-profile-picture" />
                </picture>
            </div>
            <div className= "profile-user-info">
                <h3>{user.username}</h3>
                <p>{user.aboutMe}</p>
                <h1></h1>
            </div>
            </div>
            <div className="requests-container">
                <h1>Friend Requests</h1>
                <div className="request-card-container">
                {requests.map(request=> {
                    return <FriendRequestCard request={request} key={request.id} {...props} AcceptRequest={AcceptRequest} />
                })}
            </div>
            </div>
      
        </>
    )
}
export default MyProfile ;