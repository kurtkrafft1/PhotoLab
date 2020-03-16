const remoteUrl = "http://localhost:5002/"

export default {
    getUserInfo(id){
        return fetch(`${remoteUrl}users?userId=${id}`).then(r=>r.json())
    }
}