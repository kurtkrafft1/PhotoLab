import React, {useState, useEffect} from "react"


const FriendsPhotoCard = props => {
  
    return (
        <>
        <div className="friendPhoto">
        <picture>
                <img src={props.photo.url} alt={props.photo.title} id="friends-photo-thumbnail" onClick={()=> {
                    props.history.push(`/friends/photos/details/${props.photo.id}`)
                }}/>
            </picture>
            <h5>{props.photo.title}</h5>
        </div>
        
        </>
    )
}
export default FriendsPhotoCard;