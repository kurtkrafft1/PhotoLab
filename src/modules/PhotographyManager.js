const remoteUrl = "http://localhost:5002/"

export default {
    getAll() {
        return fetch(`${remoteUrl}myphotos`).then(r=>r.json())
    },
    getAllWithId(id) {
        return fetch(`${remoteUrl}myphotos?userId=${id}`).then(r=>r.json())
    },
    getOne(id) {
        return fetch(`${remoteUrl}myphotos/${id}`).then(r=>r.json())
    },
    updatePhoto(editedPhoto) {
        return fetch (`${remoteUrl}myphotos/${editedPhoto.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editedPhoto)
        }).then(r=>r.json())
    },
    postNewphoto(newPhoto){
        return fetch(`${remoteUrl}myphotos`, {
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
    },
    getCommentsForPhoto(photoId){
        return fetch(`${remoteUrl}comments?photoId=${photoId}&_expand=user`).then(r=>r.json())
    },
    deleteComment(id){
        return fetch(`${remoteUrl}comments/${id}`,{
            method: "DELETE"
        }).then(r=>r.json())
    },
    putEditedComment(obj){
        return fetch(`${remoteUrl}comments/${obj.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    getOneComment(id){
        return fetch(`${remoteUrl}comments/${id}`).then(r=>r.json())
    },
    postNewComment(obj){
        return fetch(`${remoteUrl}comments`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    }
}