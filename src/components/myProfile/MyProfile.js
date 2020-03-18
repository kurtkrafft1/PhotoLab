import React, { useState, useEffect } from 'react'
import FriendsManager from "../../modules/FriendsManager"

const MyProfile = props => {
    const user = JSON.parse(sessionStorage.getItem('credentials'))
    const [requests, setRequests] = useState([])
    const [refresh, setRefresh] = useState(false)

    const AcceptRequest = (requestId) => {
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


}