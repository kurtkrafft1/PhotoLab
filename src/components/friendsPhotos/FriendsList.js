import React, { useState, useEffect } from "react";
import FriendsManager from "../../modules/FriendsManager";
import FriendCard from "./FriendCard";
import "./Friends.css"
import UserManager from "../../modules/UserManager";
import FriendAddCard from "./FriendAddCard";

const FriendsList = props => {
  const [friends, setFriends] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('credentials'))
  // const user = { id: 1 };
  const [friendSearch, setFriendSearch] = useState({username: "none entered"})
  const [friendResults, setFriendResults] = useState([])
  const [flag, setFlag] = useState(false)


  const handleFieldChange = e=> {
      const stateToChange = {...friendSearch}
      stateToChange[e.target.id] = e.target.value
      setFriendSearch(stateToChange)
  }
const enterKeyPress = e => {
    if (e.charCode === 13){
        e.preventDefault()
        UserManager.findUserByUsername(friendSearch.username).then(friendsFromApi=> {
            setFriendResults(friendsFromApi)
        })
    }
}
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
            FriendsManager.makeNewFriendRequest(newFriendRequest).then(()=> setFlag(!flag))
        }
    })

}
  const handleDelete = (id, userId) => {
    FriendsManager.deleteFriend(id).then(() => {
      FriendsManager.getOneFriendByActiveUserIdAndUserId(user.id, userId).then(
        friendRelationship => {
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
        setFriends(friendsFromApi);
      }
    );
  }, [flag]);

  return (
    <>
    <div className="center-page">
      <h1 className="page-title">Friends...</h1>
      <div className="icon-container"></div>
      <div className="friend-container">
        {friends.map(friend => {
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
      <div className="center-page no-top"> 
          <h1>Search Usernames....</h1>
          <div className="friend-search">
              <input type="text" id="username" placeholder="Search here..." onChange={handleFieldChange} onKeyPress={enterKeyPress}/>
          </div>
          { friendSearch.username==="none entered" ? (
               <div></div>
          ) : (
            <div className="friend-container">
                {
                    friendResults.map(friend=> {
                        return (
                            <FriendAddCard friend={friend} key={friend.id} handleAdd={handleAdd} {...props} />
                        )
                    })
                }
                </div>
          )
          }
            
      </div>
    </>
  );
};
export default FriendsList;
