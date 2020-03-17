import React, { useState } from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const ExploreOnePhotoModal = props => {





    return (
        <Modal id="signup-modal" open={props.photoModalOpen} trigger={
            <picture>
                <img src={props.photo.url} alt={props.photo.title} id="friends-photo-thumbnail" onClick={props.togglePhotoModal}/>
            </picture>
        }>
                     <Modal.Content>
            <i className="window close outline icon" onClick={props.togglePhotoModal}></i>
            <Modal.Header>{props.photo.title}</Modal.Header>
            <div className="modal-photo-close-up">
                <picture>
                <img src={props.photo.url} alt={props.photo.title} id="modal-friends-photo" />
                </picture>
            </div>  
            </Modal.Content>
        </Modal>
    )
}
export default ExploreOnePhotoModal;

{/* <ExploreOnePhotoModal photo={props.photo} setPhotoModalOpen={setPhotoModalOpen} togglePhotoModal={togglePhotoModal} photoModalOpen={photoModalOpen} {...props}/> */}
// const [photoModalOpen, setPhotoModalOpen] = useState(false)
    
// const togglePhotoModal = ()=> {
//     setPhotoModalOpen(!photoModalOpen)
// }