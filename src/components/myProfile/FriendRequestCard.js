import React, { useState, useEffect } from "react";
import UserManager from "../../modules/UserManager"

const FriendRequestCard = props => {
    const [requestUser, setRequestUser] = useState({})
    const requestId = props.request.id

    useEffect(()=> {
        UserManager.getUserInfo(props.request.activeUserId).then(userFromApi=> setRequestUser(userFromApi[0]))
    },[])
   
    return (
        <>
        <div className="friend-card">
            <div className="request-photo-card">
                <picture>
                    <img src={requestUser.profPic} alt='They added you' id="request-user-prof-pic" />
                </picture>
            </div>
            <div className="request-user-name">
                <h1>{requestUser.username}</h1>
            </div>
            <div className="accept-user-or-deny-user">
            <i className="user plus icon" onClick={()=> props.AcceptRequest(requestId)} id="icons"></i>
            <i className="user times icon add_space" id="icons" onClick={()=> {props.denyRequest(requestId)}}></i>
            </div>
        </div>
        </>
    )
}
export default FriendRequestCard;