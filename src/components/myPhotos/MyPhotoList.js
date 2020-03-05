import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import MyPhotoCard from "./MyPhotoCard";

const  MyPhotoList = (props) => {
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllPhotos=()=> {
        setIsLoading(true)
        PhotographyManager.getAll().then(photosFromApi=> {
            setPhotos(photosFromApi)
            setIsLoading(false)
        })
    }
    const deleteCard = (id) => {
        setIsLoading(true)
        PhotographyManager.deletePhoto(id).then(()=> {
            PhotographyManager.getAll().then(setPhotos)
            setIsLoading(false)
        })
    }
    useEffect(()=> {
        getAllPhotos()
    },[])

    return (
        <>
            <div className="card-container">
                <div className="icon-container"></div>
               
    {photos.map(photo=> (
    <MyPhotoCard key={photo.id} photo={photo} deleteCard={deleteCard} {...props} />))}
     
                

            </div>
        </>
    )
}

export default MyPhotoList;