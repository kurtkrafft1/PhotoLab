const remoteUrl = "http://localhost:5002/"

export default {
    getAllApprovedFriendsByUserId(id) {
        return fetch(`${remoteUrl}/friends?userId=${id}&statusId=1`).then(r=>r.json())
    },
    getAllApprovedFriendsByFriendUserId(id){
        return fetch(`${remoteUrl}/friends?friendUserId=${id}&statusId=1`).then(r=>r.json())
    },
    getAllRequestedFriendsbyUserId(id) {
        return fetch(`${remoteUrl}/friends?userId=${id}&statusId=2`).then(r=>r.json())
    },
    getAllRequestedFriendsbyFriendUserId(id) {
        return fetch(`${remoteUrl}/friends?friendUserId=${id}&statusId=2`).then(r=>r.json())
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
    }
    
}