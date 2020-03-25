import React, { useState, useEffect } from "react";
import FriendManager from "../../modules/FriendsManager";
import FriendsManager from "../../modules/FriendsManager";

const FriendAddCard = props => {
  const [isFriends, setIsFriends] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [refreshAddCard, setRefreshAddCard] = useState(false)
  const user = JSON.parse(sessionStorage.getItem("credentials"));

  const handleAdd = ( friendId) => {
    FriendsManager.getPendingRequestWithUserIdAndFriendId(user.id, friendId).then(relationship=> {
        console.log(relationship)
        if (relationship.length>0 && relationship[0].statusId===1){
            window.alert('You are already friends!')
        } else  if (relationship.length>0 && relationship[0].statusId===2){
            window.alert('This person hasn\'t approved your last request')
        } else  if (relationship.length>0 && relationship[0].statusId===3){
            window.alert('This person hasn\'t approved your last request')
        } else {
            const newFriendRequest = {
                activeUserId: user.id,
                userId: friendId,
                statusId: 2
            }
            FriendsManager.makeNewFriendRequest(newFriendRequest).then(()=>setRefreshAddCard(!refreshAddCard))
        }
    })

}
  useEffect(() => {
    props.friends.forEach(userFriend => {
      if (userFriend.user.id === props.friend.id) {
        setIsFriends(true);
      }
    });
    FriendsManager.getAllRequestsByActiveUserId(user.id).then(arr => {
      arr.forEach(pendingRequest => {
        if (pendingRequest.userId === props.friend.id) {
          setRequestPending(true);
        }
      });
    });
  }, [refreshAddCard]);
  return (
    <div className="friend-card">
      <div className="friend-card-info">
        <picture >
          <img
            src={props.friend.profPic}
            alt="friends profile"
            className="friend-profile-pic"
          />
        </picture>
        <h3>{props.friend.username}</h3>
      </div>
      <div className="unfollow-container">
        {isFriends ? (
          <i className="small check circle outline icon"></i>
        ) : requestPending ? (
          <p>Pending...</p>
        ) : (
          <i
            className="user plus icon"
            onClick={() =>handleAdd(props.friend.id)}
          ></i>
        )}
      </div>
    </div>
  );
};
export default FriendAddCard;


