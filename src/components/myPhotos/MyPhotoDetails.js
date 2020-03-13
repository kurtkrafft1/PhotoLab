import React, { useState, useEffect} from "react";
import PhotographyManager from '../../modules/PhotographyManager'
import MyPhotoEditModal from "./MyPhotoEditForm";
import { confirmAlert } from 'react-confirm-alert'; 
import CommentCard from "./CommentCard.js";

const MyPhotoDetails = props => {
    const [photo, setPhoto] = useState({title: "", description: "", url:"", id:"", date:""})
    const [isLoading, setIsLoading] = useState(false)
    const [ modalOpen, handleModal ] = useState(false);
    const [comments, setComments] = useState([])
    const [refreshComments, setRefreshComments] = useState(false)
    const toggleModal = () => {
        handleModal(!modalOpen)
    };
    
    const HandleDelete = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  PhotographyManager.deletePhoto(props.photoId).then(()=>props.history.push('/myphotos'))
              },
              {
                label: 'No',
                onClick: () => ""
              }
            ]
          });
    }


    useEffect(()=> {
       
        PhotographyManager.getOne(props.photoId).then(photo=> {
            // console.log(photo)
           setPhoto({
               description: photo.description,
               title: photo.title,
               url: photo.url,
               id: props.photoId,
               date: photo.date
           })
    }).then(()=> {
      PhotographyManager.getCommentsForPhoto(props.photoId).then(commentsFromApi=> setComments(commentsFromApi))
      setRefreshComments(false)
     })
  },[refreshComments])
   
    if(photo.description===undefined){
        return (
            <div className='card'>
            <div className = "card-content">
              <h1>Sorry page not found</h1>
              <picture>
                <img src="https://media.giphy.com/media/3ohzdYJK1wAdPWVk88/giphy.gif"  className="card-photo"/>
    
              </picture>
            </div>
          </div>
        )
    }else {
        return (
            <>
            <div className="newRoot">
                <div className="button-container">
                <i id="icons"className=" big arrow alternate circle left icon" onClick={()=> props.history.push("/myphotos")}></i>
                {/* <i id="icons"className="big edit outline icon" onClick={()=> props.history.push(`/myphotos/${props.photoId}/edit`)}></i> */}
                <MyPhotoEditModal toggleModal={toggleModal} photoId={props.photoId} {...props}  modalOpen={modalOpen}/>
         
                
                </div>
            <div className="Viewcard">
                <div className="Viewcard-content">
                    <picture className="dets-pic">
                        <img src={photo.url} alt="photo" className="card-photo"/>
                    </picture>
        <h2><em>{photo.title}</em></h2>
        <h6>{photo.description}</h6>
        <p>{photo.date}</p>
        <div className="icons">
                <i className="trash alternate outline icon" onClick={HandleDelete}></i>
                </div>
            </div>
                </div>
               
               <div className="comment-container">
                 <div className="comment-card-container">
                   {
                     comments.map(comment=> {
                       return <CommentCard key={comment.id} comment={comment} refreshComments={refreshComments} setRefreshComments={setRefreshComments}/>
                     })
                   }
                 </div>
               </div>
            </div>
            </>
        )
    }
}
export default MyPhotoDetails
