import React, { useState, useEffect} from "react";
import PhotographyManager from '../../modules/PhotographyManager'
import MyPhotoEditModal from "./MyPhotoEditForm";
import { confirmAlert } from 'react-confirm-alert'; 
import CommentCard from "./CommentCard.js";
import "./MyPhotoDetails.css";

const MyPhotoDetails = props => {
    const [photo, setPhoto] = useState({title: "", description: "", url:"", id:"", date:""})
    const [isLoading, setIsLoading] = useState(false)
    const [ modalOpen, handleModal ] = useState(false);
    const [comments, setComments] = useState([])
    const [refreshComments, setRefreshComments] = useState(false)
    const [newMessage, setNewMessage] = useState({})
    const toggleModal = () => {
        handleModal(!modalOpen)
    };
    // const user= JSON.parse(sessionStorage.getItem('credentials'))
    const user={id:1}
    
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
    const handleMessageChange = e=> {
      const stateToChange = {...newMessage}
      stateToChange[e.target.id] = e.target.value
      setNewMessage(stateToChange)
    }
    const postNewMessage = e => {
      e.preventDefault()
      if(newMessage.message===""){
        window.alert("please type a comment")
      } else {
        const newComment = {
          message: newMessage.message,
          photoId: props.photoId,
          userId: user.id
        }
        console.log(newComment)
        PhotographyManager.postNewComment(newComment).then(()=> {
          setRefreshComments(!refreshComments)

        })
      }
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
      setNewMessage({message:""})
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
                <div className="detail button-container">
                <i id="icons"className=" big arrow alternate circle left icon" onClick={()=> props.history.push("/myphotos")}></i>
                {/* <i id="icons"className="big edit outline icon" onClick={()=> props.history.push(`/myphotos/${props.photoId}/edit`)}></i> */}
                <MyPhotoEditModal toggleModal={toggleModal} photoId={props.photoId} {...props}  modalOpen={modalOpen}/>
         
                
                </div>
            <div className="view-card">
                <div className="view-card-content">
                    <picture className="dets-pic">
                        <img src={photo.url} alt="photo" className="detail-card-photo"/>
                    </picture>
                    <div className="photo-info">
        <h2><em>{photo.title}</em></h2>
        <h6>{photo.description}</h6>
        <p>{photo.date}</p>
        </div>
        <div className="icons">
                <i className="trash alternate outline icon" onClick={HandleDelete}></i>
                </div>
            </div>
                </div>
               
               <div className="comment-container">
                 <div className="comment-header"><h1>Comments...</h1></div>
                 <div className="comment-card-container">
                   {
                     comments.map(comment=> {
                       return <CommentCard key={comment.id} comment={comment} refreshComments={refreshComments} setRefreshComments={setRefreshComments}/>
                     })
                   }
                 
                 </div>
                 <div className="message-input-container">
                     <input type="text" id="message" onChange={handleMessageChange} placeholder="New Comments"value={newMessage.message}/>
                     <div>
                     <div className="send-div" onClick={postNewMessage}><i className="big paper plane outline icon"></i></div>
                     </div>
                   </div>
               </div>
               
            </div>
            </>
        )
    }
}
export default MyPhotoDetails;
