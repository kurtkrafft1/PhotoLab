import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendCard from "./FriendCard";

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
      <h1 className="page-title">Friends...</h1>
      <div className="icon-container"></div>
      <div className="friend-container">
        {friends.map(friend => {
          return (
            <FriendCard
              friend={friend}
              key={friend.id}
              {...props}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </>
  );
};
export default FriendsList;
