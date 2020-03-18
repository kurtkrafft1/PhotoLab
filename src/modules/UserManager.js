const remoteUrl = "http://localhost:5002/"

export default {
    getUserInfo(id){
        return fetch(`${remoteUrl}users?id=${id}`).then(r=>r.json())
    },
    findUserByUsername(username) {
        return fetch(`${remoteUrl}users?username=${username}`).then(r=>r.json())
    },
    checkProfile(credentials) {
        return fetch(`${remoteUrl}users?email=${credentials.email}`).then(r=>r.json())
    },
    postNewProfile(profile) {
        return fetch(`${remoteUrl}users`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(profile)

        }).then(r=>r.json())
    }
    
}