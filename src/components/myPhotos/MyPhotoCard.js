import React from "react"

const MyPhotoCard = props => {
    return(
        <div className = "card">
            <div className="card-content">
                <picture>
                    <img src={`${props.photo.url}`} alt="My Photo" className="my-photo" onClick={()=> props.history.push(`/myphotos/${props.photo.id}`)}/>
                </picture>
                <p className = "light-text">{props.photo.date}</p>
                <h3><span className="title-name">{props.photo.title} </span></h3>
               <i id="icons"className="trash alternate outline icon" onClick={()=> props.deleteCard(props.photo.id)}></i>
                <i id="icons"className="eye icon" onClick={()=> props.history.push(`/myPhotos/${props.photo.id}`)}></i>
            </div>
        </div>
    )
}
export default MyPhotoCard;