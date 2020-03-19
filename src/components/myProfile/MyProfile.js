import React, { useState, useEffect } from 'react'
import FriendsManager from "../../modules/FriendsManager"
import FriendRequestCard from "./FriendRequestCard";
import "./MyProfile.css";
import EditProfileModal from "./EditProfileModal";
import UserManager from '../../modules/UserManager';

const MyProfile = props => {
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'))
    const [requests, setRequests] = useState([])
    const [user, setUser] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [profileModalOpen, setProfileModalOpen] = useState(false)


    const toggleModal = () => {
        setProfileModalOpen(!profileModalOpen)
    }
    const AcceptRequest = (requestId) => {
        console.log('accepting')
        FriendsManager.updateExistingFriendRequestToAccepted(requestId).then(obj=> {
            const newFriend = {
                activeUserId: activeUser.id,
                userId: obj.activeUserId,
                statusId: 1
            }
            FriendsManager.makeNewFriendRequest(newFriend).then(()=> {
                setRefresh(!refresh)
            })
        })
    }


    useEffect(()=> {
        FriendsManager.getAllRequests(activeUser.id).then(setRequests).then(()=> {
            UserManager.getUserInfo(activeUser.id).then(userFromApi=> setUser(userFromApi[0]))
        })
        
    }, [refresh])


    return (
        <>
          <div className="profile-edit-icon">
          <EditProfileModal toggleModal={toggleModal} profileModalOpen={profileModalOpen} userId={user.id} refresh={refresh} setRefresh={setRefresh}/>
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