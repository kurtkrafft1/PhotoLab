import React, {useState, useEffect} from "react"
import ExploreOnePhotoModal from "./ExploreOnePhotoModal"
import PhotographyManager from "../../modules/PhotographyManager"

const ExplorePhotoCard = props => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    const [hasBeenStarred, setHasBeenStarred] = useState(false)
    const [starredPhotos, setStarredPhotos] = useState([])
    const user=JSON.parse(sessionStorage.getItem('credentials'))
    const [resetCard, setResetCard] = useState(false)

const togglePhotoModal = ()=> {
    setPhotoModalOpen(!photoModalOpen)
}
const handleStarPhoto=(photoId) => {
    
    const newStar = {
        photoId: photoId,
        userId: user.id
    }
    PhotographyManager.starAPhoto(newStar).then(()=> {
        setResetCard(!resetCard)
    })
}
useEffect(()=> {
    PhotographyManager.getStarredPhotos(user.id).then(photosFromApi=> {
        photosFromApi.forEach(photo=> {
            if(photo.photoId===props.photo.id){
                setHasBeenStarred(true)
            }
        })
        
    }, [resetCard])
})
    return (
        <>
        <div className="explore-photo-container">
        <ExploreOnePhotoModal photo={props.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/>
        <div className="photo-title" id={props.photo.id}>
            <h4>{props.photo.title}</h4>
            {hasBeenStarred===true ? (<i className="star outline icon" id="gold" ></i>) : (<i className="star outline icon" id="icons" onClick={()=> handleStarPhoto(props.photo.id)}></i>)}

        </div>
        </div>
    
        </>
    )
}
export default ExplorePhotoCard