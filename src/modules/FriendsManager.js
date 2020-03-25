const remoteUrl = "http://localhost:5002"

export default {
    getAllApprovedFriendsByActiveUserId(id) {
        return fetch(`${remoteUrl}/friends?activeUserId=${id}&statusId=1&_expand=user`).then(r=>r.json())
    },
    getAllRequestedFriendsbyUserId(id) {
        return fetch(`${remoteUrl}/friends?activeUserId=${id}&statusId=2&_expand=user`).then(r=>r.json())
    },
    makeNewFriendRequest(obj){
        return fetch(`${remoteUrl}/friends`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    acceptFriendRequest(obj){
        return fetch(`${remoteUrl}/friends/${obj.id}`,{
            method: "PUT",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    deleteFriend(id){
        return fetch(`${remoteUrl}/friends/${id}`, {
            method: "DELETE",
        }).then(r=> r.json())
    },
    getOneFriendByActiveUserIdAndUserId(activeUserId, userId) {
        return fetch(`${remoteUrl}/friends?activeUserId=${userId}&userId=${activeUserId}`).then(r=>r.json())
    },
    getOneApprovedFriendByActiveUserIdAndUserId(activeUserId, userId) {
        return fetch(`${remoteUrl}/friends?activeUserId=${activeUserId}&userId=${userId}&statusId=1`).then(r=>r.json())
    },
    getPendingRequestWithUserIdAndFriendId(activeUserId, userId){
        return fetch(`${remoteUrl}/friends?activeUserId=${activeUserId}&userId=${userId}`).then(r=>r.json())
    },
    getAllRequests(activeUserId){
        return fetch(`${remoteUrl}/friends?userId=${activeUserId}&statusId=2`).then(r=>r.json())
    },
    updateExistingFriendRequestToAccepted(id){
        return fetch(`${remoteUrl}/friends/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({statusId: 1})
        }).then(r=>r.json())
    },
    updateExistingFriendRequestToDenied(id){
        return fetch(`${remoteUrl}/friends/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({statusId: 3})
        }).then(r=>r.json())
    },
    getAllRequestsByActiveUserId(activeUserId) {
        return fetch(`${remoteUrl}/friends?activeUserId=${activeUserId}&statusId=2`).then(r=>r.json())
    }
    
}