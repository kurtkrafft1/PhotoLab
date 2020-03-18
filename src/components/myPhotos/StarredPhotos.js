import React, { useState, useEffect} from "react"
import PhotographyManager from "../../modules/PhotographyManager"
import { confirmAlert } from 'react-confirm-alert'; 
import StarredPhotoCard from "./StarredPhotoCard";

const StarredPhotos = props => {
    const [starredPhotos, setStarredPhotos] = useState([])
    const [refreshPhotos, setRefreshPhotos] = useState(false)
    const user = JSON.parse(sessionStorage.getItem('credentials'))
    
    const handleDelete = (id) => {
        confirmAlert({
            title: 'Hold up....',
            message: 'Are you sure you want to unstar this photo?',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  PhotographyManager.deleteStarredPhoto(id).then(setRefreshPhotos(!refreshPhotos))
                
                
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
          });
        
    }

    useEffect(()=> {
        PhotographyManager.getStarredPhotos(user.id).then(photosFromApi=> {
            setStarredPhotos(photosFromApi)
            
        })
    }, [refreshPhotos])

    return (
        <>
           <div className="container-header">
      </div>
      <div className="button-container">
      <div className="left-or-right-buttons">
            <div className="ui left attached button" role="button" tabindex="0" onClick={()=> {props.history.push('/myphotos')}}>
              My Photos
            </div>
            <div className="ui right attached button" role="button" tabindex="0"style={{opacity:0.8}}>
              Starred Photos
            </div>
          </div>
      </div>
      <div className="card-container">
          {starredPhotos.map(starredPhoto=> {
              return <StarredPhotoCard starredPhoto={starredPhoto} handleDelete={handleDelete} key={starredPhoto.id} {...props} />
          })}
      </div>
        </>
    )
}
export default StarredPhotos;