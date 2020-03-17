import React, {useState, useEffect} from "react"
import ExploreOnePhotoModal from "./ExploreOnePhotoModal"

const ExplorePhotoCard = props => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    
const togglePhotoModal = ()=> {
    setPhotoModalOpen(!photoModalOpen)
}
    return (
        <>
        <div className="explore-photo-container">
        <ExploreOnePhotoModal photo={props.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/>
        <div className="photo-title">
            <h4>{props.photo.title}</h4>
        </div>
        </div>
    
        </>
    )
}
export default ExplorePhotoCard