// const remoteUrl = "http://localhost:5002/"
const remoteUrl = () => {
    if(window.location.href.includes('com')){
      return 'https://photolab-1.herokuapp.com'
    } else {
      return "http://localhost:5002/";
    }
  }

export default {
    getAll() {
        return fetch(`${remoteUrl()}photos`).then(r=>r.json())
    },
    getAllWithId(id) {
        return fetch(`${remoteUrl()}photos?userId=${id}`).then(r=>r.json())
    },
    getOne(id) {
        return fetch(`${remoteUrl()}photos/${id}`).then(r=>r.json())
    },
    getOneAndExpandUser(id) {
        return fetch(`${remoteUrl()}photos/${id}?_expand=user`).then(r=>r.json())
    },
    updatePhoto(editedPhoto) {
        return fetch (`${remoteUrl()}photos/${editedPhoto.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editedPhoto)
        }).then(r=>r.json())
    },
    postNewphoto(newPhoto){
        return fetch(`${remoteUrl()}photos`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newPhoto)
        })
    },
    deletePhoto(id) {
        return fetch(`${remoteUrl()}photos/${id}`,{
            method: "DELETE"
        }).then(r=>r.json())
    },
    getCommentsForPhoto(photoId){
        return fetch(`${remoteUrl()}comments?photoId=${photoId}&_expand=user`).then(r=>r.json())
    },
    deleteComment(id){
        return fetch(`${remoteUrl()}comments/${id}`,{
            method: "DELETE"
        }).then(r=>r.json())
    },
    putEditedComment(obj){
        return fetch(`${remoteUrl()}comments/${obj.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    getOneComment(id){
        return fetch(`${remoteUrl()}comments/${id}`).then(r=>r.json())
    },
    postNewComment(obj){
        return fetch(`${remoteUrl()}comments`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    getRandomPhotos(){
        return fetch(`${remoteUrl()}photos`).then(r=>r.json())
    },
    getStarredPhotos(id){
        return fetch (`${remoteUrl()}starredPhotos?userId=${id}&_expand=photo`).then(r=>r.json())
    },
    deleteStarredPhoto(id){
        return fetch(`${remoteUrl()}starredPhotos/${id}`, {
            method: "DELETE"
        }).then(r=>r.json())
    },
    starAPhoto(obj){
        return fetch(`${remoteUrl()}starredPhotos`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=> r.json())
    }
   
}