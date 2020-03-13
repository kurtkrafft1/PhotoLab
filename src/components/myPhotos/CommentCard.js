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
            <div className="comment-card">
                <h2>{props.comment.message}</h2>
                <p className="light-text small">{props.comment.user.username}</p>
                <i className="small trash alternate outline icon" onClick={()=> HandleCommentDelete(props.comment.id)}></i>
                <EditCommentModal toggleCommentModal={toggleCommentModal} commentModalOpen={commentModalOpen} commentId={props.comment.id} />
            </div>
        )
    }else {
        return(
            <div className="comment-card">
            <h2>{props.comment.message}</h2>
            <p className="light-text small">{props.comment.user.username}</p>
        </div>
        )

    }
}
export default CommentCard;