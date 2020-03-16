import React from "react"

const FriendAddCard = props => {
    return(
        <div className="friend-card" >
        <div className="friend-card-info" onClick={() => {props.history.push(`friends/photos/${props.friend.id}`)}}>
        <picture>
            <img src={props.friend.profPic} alt="friends profile" className="friend-profile-pic"/>
        </picture>
        <h3>{props.friend.username}</h3>
        </div>
        <div className="unfollow-container">
        <i className="user plus icon" onClick={()=> props.handleAdd(props.friend.id)}></i>
        </div>
    </div>
    )
}
export default FriendAddCard;