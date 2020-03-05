const remoteUrl = "http://localhost:5002/"

export default {
    getAll() {
        return fetch(`${remoteUrl}myPhotos`).then(r=>r.json())
    },
    getOne(id) {
        return fetch(`${remoteUrl}myPhotos/${id}`).then(r=>r.json)
    },
    updatePhoto(editedPhoto) {
        return fetch (`${remoteUrl}myPhotos/${editedPhoto.id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editedPhoto)
        }).then(r=>r.json())
    },
    postNewphoto(newPhoto){
        return fetch(`${remoteUrl}myPhotos`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newPhoto)
        })
    },
    deletePhoto(id) {
        return fetch(`${remoteUrl}myphotos/${id}`,{
            method: "DELETE"
        }).then(r=>r.json())
    }
}