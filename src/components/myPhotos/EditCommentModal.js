import React, {useState, useEffect} from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import PhotographyManager from "../../modules/PhotographyManager";

const EditCommentModal =props => {
    const [editComment, setEditComment] = useState({})
    const [isLoading, setIsLoading] =useState(false)

    const handleFieldChange=e=> {
        const stateToChange = {...editComment}
        stateToChange[e.target.id] = e.target.value
        setEditComment(stateToChange)
    }
    const postNewComment = e=> {
        e.preventDefault()
        if(editComment.message===""){
            window.alert("Please enter a new or updated message or delete it on the previous page")
        }else {
            const commentToPut = {
                id: editComment.id,
                userId:editComment.userId,
                message: editComment.message,
                photoId: editComment.photoId
            }
            setIsLoading(true)
            PhotographyManager.putEditedComment(commentToPut).then(
                props.toggleCommentModal
             
            )
        }
    }
    
    useEffect(()=> {
        PhotographyManager.getOneComment(props.commentId).then(commentFromApi=> {
            setEditComment(commentFromApi)})
    }, [])

    return (
        <Modal id="signup-modal" open={props.commentModalOpen} trigger={ <i id="icons"className="small edit outline icon" onClick={props.toggleCommentModal}></i>}>
            <Modal.Header>Edit Comment</Modal.Header>
            <Modal.Content>
                <Form>
                <Form.Group widths='equal'>
                <Form.Field
                        id='message'
                        control={Input}
                        label='Title'
                        placeholder='Title...'
                        onChange={handleFieldChange}
                        value={editComment.message}
                     
                    />
                    </Form.Group>
                </Form>
                <div className="login-form=buttons">
            <Button disabled={isLoading} onClick={postNewComment}>Submit</Button>
            <Button onClick={props.toggleCommentModal}>Cancel</Button>
            </div>
            </Modal.Content>
        </Modal>
    )
}
export default EditCommentModal