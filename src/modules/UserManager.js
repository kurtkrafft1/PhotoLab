const remoteUrl = "http://localhost:5002/"

export default {
    getUserInfo(id){
        return fetch(`${remoteUrl}users?id=${id}`).then(r=>r.json())
    },
    findUserByUsername(username) {
        return fetch(`${remoteUrl}users?username=${username}`).then(r=>r.json())
    }
}