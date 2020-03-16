import React, { useState } from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const ViewFriendPhotoModal = props => {






    return (
        <Modal id="signup-modal" open={props.photoModalOpen} trigger={
            <picture>
                <img src={props.photo.url} alt={props.photo.title} id="friends-photo-thumbnail" />
            </picture>
        }>
            <i class="window close outline icon" onClick={props.togglePhotoModal}></i>
            <Modal.Header>{props.photo.title}</Modal.Header>
            <div className="modal-photo-close-up">
                <picture>
                <img src={props.photo.url} alt={props.photo.title} id="modal-friends-photo" />
                </picture>
            </div>  

        </Modal>
    )
}
export default ViewFriendPhotoModal;