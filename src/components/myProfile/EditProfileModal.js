import React, {useState, useEffect} from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import UserManager from "../../modules/UserManager";
import keys from "../../keys/ApiKies";

const EditProfileModal = props => {
    const [editedUser, setEditedUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState({profPic: ""})
    const user= JSON.parse(sessionStorage.getItem('credentials'))

    const handleFieldChange = e => {
        const stateToChange = {...editedUser}
        stateToChange[e.target.id] = e.target.value
        setEditedUser(stateToChange)
    }

    const postEditedUser = e => {
        e.preventDefault()
        if(editedUser.username===""|| editedUser.aboutMe===""||editedUser.email===""){
            window.alert('Please be sure all the fields are entered')
        }else if(image.profPic==="") {
            const EUser = {
                id: editedUser.id,
                username: editedUser.username,
                aboutMe:editedUser.aboutMe,
                email:editedUser.email,
                profPic: editedUser.profPic
            }
            UserManager.putEditedProfile(EUser).then(()=> {
                props.toggleModal()
                props.setRefresh(!props.refresh)
            })
        } else if (image.profPic!== ""){
            const EUser = {
                id: editedUser.id,
                username: editedUser.username,
                aboutMe:editedUser.aboutMe,
                email:editedUser.email,
                profPic: image.profPic
            }
            UserManager.putEditedProfile(EUser).then(()=> {
                props.toggleModal()
                props.setRefresh(!props.refresh)
            })
        }
    }
    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "photoLab");
        setIsLoading(true);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
          {
            method: "POST",
            body: data
          }
        );
        const file = await res.json();
        setImage({ profPic: file.secure_url });
        setIsLoading(false);
      };
    useEffect(()=> {
        UserManager.getUserInfo(user.id).then(userFromApi=> 
            setEditedUser(userFromApi[0]))
    }, [])

    return (
        <>
        <Modal id="edit-profile-modal" open={props.profileModalOpen} trigger={ <i id="icons"className="big edit outline icon" onClick={props.toggleModal}></i>}>
        <Modal.Header>Edit Profile</Modal.Header>
             <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='username'
                            control={Input}
                            label='username'
                            placeholder='Username...'
                            onChange={handleFieldChange}
                            value={editedUser.username}
                        />
                    </Form.Group>
                    <Form.Field
                            id='aboutMe'
                            control={TextArea}
                            label='aboutMe'
                            placeholder='About Me...'
                            onChange={handleFieldChange}
                            value={editedUser.aboutMe}
                        />
                    <Form.Field
                            id='email'
                            control={Input}
                            label='email'
                            placeholder='Email...'
                            onChange={handleFieldChange}
                            value={editedUser.email}
                        />
                
            <br></br>
                </Form>
                <div className="login-form=buttons">
                <Button onClick={postEditedUser}>Submit</Button>
                <Button onClick={props.toggleModal}>Cancel</Button>
                </div>
            </Modal.Content >
        </Modal>
        </>
    )
}
export default EditProfileModal;