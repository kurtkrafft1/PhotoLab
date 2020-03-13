import React, {useState, useEffect} from "react"
import PhotographyManager from "../../modules/PhotographyManager";
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import { confirmAlert } from 'react-confirm-alert'; 
import keys from "../../keys/ApiKies"
const MyPhotoEditModal = props => {
    const [photo, setPhoto] = useState({})
    const [image, setImage] = useState({url:""})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = e => {
        const stateToChange = {...photo}
        stateToChange[e.target.id] = e.target.value
        setPhoto(stateToChange)
    }
    const putPhoto = e => {
        e.preventDefault()
        if(photo.title===""|| photo.description===""||photo.url===""){
            window.alert("Please fill out all the fields")
        }else {
            const editedPhoto ={
                id:props.photoId,
                title: photo.title,
                description: photo.description,
                url: image.url,
                date: photo.date,
                likes: photo.likes,
                userId: photo.userId
            }
            PhotographyManager.updatePhoto(editedPhoto).then(props.history.push('/myphotos'))
        }
    }
    const HandleDelete = e => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => alert('Click Yes')
              },
              {
                label: 'No',
                onClick: () => alert('Click No')
              }
            ]
          });
    }
    useEffect(()=> {
        PhotographyManager.getOne(props.photoId).then(photo=> {
            setPhoto(photo)
            setImage({url: photo.url})
        })
    }, [])   
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
        setImage({ url: file.secure_url });
        setIsLoading(false);
      };
    return (
        <Modal id="signup-modal" open={props.modalOpen} trigger={<i id="icons"className="big edit outline icon" onClick={props.toggleModal}></i>}>
            <Modal.Header>Edit Photo</Modal.Header>
             <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='title'
                            control={Input}
                            label='Title'
                            placeholder='Title...'
                            onChange={handleFieldChange}
                            value={photo.title}
                        />
                    </Form.Group>
                    <Form.Field
                            id='description'
                            control={TextArea}
                            label='Description'
                            placeholder='Description...'
                            onChange={handleFieldChange}
                            value={photo.description}
                        />
                    <Form.Field>
                    <label htmlFor="eventImage">Please upload or find an image</label>
            <input
              name="file"
              id="eventImage"
              type="file"
              className="file-upload"
              data-cloudinary-field="image_id"
              onChange={uploadImage}
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
                    </Form.Field>
                    <div className="newPhoto">
          {isLoading ? (
            <h3> Loading...</h3>
          ) : (
            <img src={image.url} style={{width: '300px'}}alt="upload-photos" />
          )}
        </div>
                </Form>
                <div className="login-form=buttons">
                <Button onClick={putPhoto}>Submit</Button>
                <Button onClick={props.toggleModal}>Cancel</Button>
                </div>
            </Modal.Content >
        </Modal>
    )
}
export default MyPhotoEditModal