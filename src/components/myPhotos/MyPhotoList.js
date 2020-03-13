import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import MyPhotoCard from "./MyPhotoCard";
import NewPhotoModal from "./NewPhotoModal";

const  MyPhotoList = (props) => {
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [refreshPhotos, setRefreshPhotos] = useState(false)
    // const user = JSON.parse(sessionStorage.getItem('credentials'))
    const user={id:1};
    

    const toggleModal = ()=> {
        setModalOpen(!modalOpen)
        setRefreshPhotos(!refreshPhotos)
    }
    const getAllPhotos=()=> {
        setIsLoading(true)
        PhotographyManager.getAllWithId(user.id).then(photosFromApi=> {
            setPhotos(photosFromApi)
            setIsLoading(false)
        })
    }
    
    useEffect(()=> {
        getAllPhotos()
        setRefreshPhotos(false)
    },[refreshPhotos])

    return (
        <>
            <div className="card-container">
                <div className="icon-container"> <div className="button-container">
      <i id="icons"className=" big arrow alternate circle left icon" onClick={()=> props.history.push("/")}></i>
{/* <i id="icons"className=" big plus square outline icon" onClick={()=> props.history.push("myphotos/new")}></i> */}
<NewPhotoModal toggleModal={toggleModal} modalOpen={modalOpen} {...props} refreshPhotos={refreshPhotos} setPhotos={setPhotos}/>

</div></div>
               
    {photos.map(photo=> (
        
    <MyPhotoCard key={photo.id} photo={photo} setRefreshPhotos={setRefreshPhotos}{...props}/>))}
     
                

            </div>
        </>
    )
}

export default MyPhotoList;