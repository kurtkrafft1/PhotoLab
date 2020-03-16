import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendCard from "./FriendCard";
import "./Friends.css"

const FriendsList = props => {
  const [friends, setFriends] = useState([]);
  // const user = JSON.parse(sessionStorage.getItem('credentials'))
  const user = { id: 1 };

  const handleDelete = (id, userId) => {
    FriendsManager.deleteFriend(id).then(() => {
      FriendsManager.getOneFriendByActiveUserIdAndUserId(user.id, userId).then(
        friendRelationship => {
            console.log(friendRelationship)
          FriendsManager.deleteFriend(friendRelationship[0].id).then(() => {
            FriendsManager.getAllApprovedFriendsByActiveUserId(user.id).then(
              friendsFromApi => {
                setFriends(friendsFromApi);
              }
            );
          });
        }
      );
    });
  };

  useEffect(() => {
    FriendsManager.getAllApprovedFriendsByActiveUserId(user.id).then(
      friendsFromApi => {
        console.log(friendsFromApi);
        setFriends(friendsFromApi);
      }
    );
  }, []);

  return (
    <>
    <div className="center-page">
      <h1 className="page-title">Friends...</h1>
      <div className="icon-container"></div>
      <div className="friend-container">
        {friends.map(friend => {
            console.log(friend)
          return (
            <FriendCard
              friend={friend}
              key={friend.user.id}
              {...props}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      </div>
    </>
  );
};
export default FriendsList;
