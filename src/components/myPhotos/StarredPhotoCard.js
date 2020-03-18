import React, { useState} from "react"
import ExploreOnePhotoModal from "../explore/ExploreOnePhotoModal";

const MyPhotoCard = props => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false)
    
    const togglePhotoModal = ()=> {
        setPhotoModalOpen(!photoModalOpen)
    }
    return(
        <div className = "card">
            <div className="card-content">
                {/* <picture>
                    <img src={`${props.starredPhoto.photo.url}`} alt="My Photo" className="my-photo" onClick={()=> props.history.push(`/myphotos/${props.photo.id}`)}/>
                </picture> */}
                <ExploreOnePhotoModal photo={props.starredPhoto.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/>
                <h3><span className="title-name">{props.starredPhoto.photo.title} </span></h3>
               <i id="icons"className="trash alternate outline icon" onClick={()=> props.handleDelete(props.starredPhoto.id)}></i>
            </div>
        </div>
    )
}
export default MyPhotoCard;