import React, {useState} from "react";
import PhotographyManager from "../../modules/PhotographyManager";
import EditCommentModal from "./EditCommentModal";

const CommentCard = props => {
    const [commentModalOpen, setCommentModalOpen] = useState(false)
    // const user = JSON.parse(sessionStorage.getItem('credentials'))
    const user={id:1}
    const HandleCommentDelete = (id) => {
        PhotographyManager.deleteComment(id).then(()=> props.setRefreshComments(!props.refreshComments))
    }
    const toggleCommentModal = ()=> {
        setCommentModalOpen(!commentModalOpen)
        props.setRefreshComments(!props.refreshComments)
    }
    if(user.id===props.comment.userId){
        return(
            <div className="user-comment">

                <p className="light-text small user-comment"><span className="user-name">{props.comment.user.username}:</span>{props.comment.message}</p>
                <div className="comment-icons">
                <i className="small trash alternate outline icon" onClick={()=> HandleCommentDelete(props.comment.id)}></i>
                <EditCommentModal toggleCommentModal={toggleCommentModal} commentModalOpen={commentModalOpen} commentId={props.comment.id} />
                </div>
            </div>
        )
    }else {
        return(
            <div className="comment-card">
            <h4></h4>
            <p className="light-text small"><span className="user-name">{props.comment.user.username}:</span>{props.comment.message}</p>
        </div>
        )

    }
}
export default CommentCard;