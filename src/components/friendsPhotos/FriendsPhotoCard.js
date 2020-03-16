import React, {useState, useEffect} from "react"
import ViewFriendPhotoModal from "./ViewFriendPhotoModal";

const FriendsPhotoCard = props => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    
    const togglePhotoModal = ()=> {
        setPhotoModalOpen(!photoModalOpen)
    }
    return (
        <>
        <div className="friendPhoto">
            <ViewFriendPhotoModal photo={props.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/>
            <h2>{props.photo.title}</h2>
        </div>
        
        </>
    )
}
export default FriendsPhotoCard;