import React, { useState } from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const ExploreOnePhotoModal = props => {





    return (
        <Modal open={props.photoModalOpen} trigger={
            <picture className="max-height-div">
                <img src={props.photo.url} alt={props.photo.title} id="friends-photo-thumbnail" onClick={props.togglePhotoModal}/>
             
            </picture>
        }>
                     <Modal.Content id="View-photo-modal">
            <i className="window close outline icon" id="flex-end" onClick={props.togglePhotoModal}></i>
            <Modal.Header id="view-modal-header">{props.photo.title}</Modal.Header>
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