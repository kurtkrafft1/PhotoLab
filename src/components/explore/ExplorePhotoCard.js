import React, {useState, useEffect} from "react"
import ExploreOnePhotoModal from "./ExploreOnePhotoModal"
import PhotographyManager from "../../modules/PhotographyManager"

const ExplorePhotoCard = props => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    const user=JSON.parse(sessionStorage.getItem('credentials'))
const togglePhotoModal = ()=> {
    setPhotoModalOpen(!photoModalOpen)
}
const handleStarPhoto=(photoId) => {
    const newStar = {
        photoId: photoId,
        userId: user.id
    }
    PhotographyManager.starAPhoto(newStar)
}
    return (
        <>
        <div className="explore-photo-container">
        <ExploreOnePhotoModal photo={props.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/>
        <div className="photo-title">
            <h4>{props.photo.title}</h4>
            <i className="star outline icon" id="icons" onClick={()=> handleStarPhoto(props.photo.id)}></i>

        </div>
        </div>
    
        </>
    )
}
export default ExplorePhotoCard