import React from "react";

const FriendCard = props => {
    return (
        <div className="friend-card" onClick={props.history.push(`friends/photos/${props.friend.id}`)}>
            <div className="friend-card-info">
            <picture>
                <img src={props.friend.user.profPic} alt="friends profile" className="friend-profile-pic"/>
            </picture>
            <h3>{props.friend.user.username}</h3>
            </div>
            <div className="unfollow-container">
            <i className="user times icon" onClick={()=> {
                props.handleDelete(props.friend.id, props.friend.user.id)
            }}></i>
            </div>
        </div>

    )
}
export default FriendCard;