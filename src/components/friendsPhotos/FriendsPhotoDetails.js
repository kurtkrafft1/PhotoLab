import React, { useState, useEffect } from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import CommentCard from "../myPhotos/CommentCard";

const FriendsPhotoDetails = props => {
  const [friendPhoto, setFriendPhoto] = useState({});
  const [comments, setComments] = useState([]);
  const [newMessage, setNewMessage] = useState({message: ""});
  const [refreshComments, setRefreshComments] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('credentials'))
  // const user = {id:1}

  const handleMessageChange = e => {
    const stateToChange = { ...newMessage };
    stateToChange[e.target.id] = e.target.value;
    setNewMessage(stateToChange);
  };
  const postNewMessage = e => {
    e.preventDefault();
    if (newMessage.message === "") {
      window.alert("please type a comment");
    } else {
      const newComment = {
        message: newMessage.message,
        photoId: props.photoId,
        userId: user.id
      };
      PhotographyManager.postNewComment(newComment).then(() => {
        setRefreshComments(!refreshComments);
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    PhotographyManager.getOneAndExpandUser(props.photoId)
      .then(photoFromApi => setFriendPhoto(photoFromApi))
      .then(() => {
        PhotographyManager.getCommentsForPhoto(
          props.photoId
        ).then(commentsFromApi => setComments(commentsFromApi));
        setRefreshComments(false);
        setNewMessage({ message: "" });
      });
  }, [refreshComments]);

  if (friendPhoto.title === undefined) {
    return (
      <div className="card">
        <div className="card-content">
          <h1>Sorry page not found</h1>
          <picture>
            <img
              src="https://media.giphy.com/media/3ohzdYJK1wAdPWVk88/giphy.gif"
              className="card-photo"
            />
          </picture>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="newRoot">
          <div className="detail button-container">
          <div className="friend-profile-icon-container">
            <i className="big arrow alternate circle left icon" id="icons" onClick={()=> props.history.push(`/friends/photos/${friendPhoto.user.id}`)}></i>
            </div>
          </div>
          <div className="view-card">
            <div className="view-card-content">
         
              <picture className="dets-pic">
                <img
                  src={friendPhoto.url}
                  alt="photo"
                  className="detail-card-photo"
                />
              </picture>
              <div className="photo-info">
                <h2>
                  <em>{friendPhoto.title}</em>
                </h2>
                <h6>{friendPhoto.description}</h6>
                <p>{friendPhoto.date}</p>
              </div>
            </div>
          </div>

          <div className="comment-container">
            <div className="comment-header">
              <h1>Comments...</h1>
            </div>
            <div className="comment-card-container">
              {comments.map(comment => {
                return (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    refreshComments={refreshComments}
                    setRefreshComments={setRefreshComments}
                  />
                );
              })}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                id="message"
                onChange={handleMessageChange}
                placeholder="New Comments"
                value={newMessage.message}
              />
              <div>
                <div className="send-div" onClick={postNewMessage}>
                  <i className="big paper plane outline icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default FriendsPhotoDetails;
