import React from "react";

const FriendCard = props => {
    return (
        <div className="friend-card">
            <picture>
                <img src={props.friend.user.profPic} alt="friends profile"/>
            </picture>
            <h1>{props.friend.user.username}</h1>
            <div className="unfollow-container">
            <i className="user times icon" onClick={()=> {
                props.handleDelete(props.friend.id, props.friend.user.id)
            }}></i>
            </div>
        </div>

    )
}
export default FriendCard;