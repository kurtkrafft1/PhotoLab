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
    }
    
}