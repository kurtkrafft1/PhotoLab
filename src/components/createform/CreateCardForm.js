import React, { useState, useCallback } from "react" ;
import UserManager from "../../modules/UserManager";
import keys from "../../keys/ApiKies";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import "./create.css"

const CreateCardForm = (props) => {
    const [user, setUser] = useState({username:"", email: "", confirmUsername: "", profPic:"", id:"" })
    const [credentials, setCredentials] = useState({username:"", email: "", profPic:"", id:"" });
    const [image, setImage] = useState({profPic: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedImage, setUploadedImage] = useState({src: ""})
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = {...user}
        stateToChange[evt.target.id] = evt.target.value
        setUser(stateToChange)
    }
    const handleFile = e => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setUploadedImage({src: fileReader.result })
        }   
        fileReader.readAsDataURL(e.target.files[0])
    }
    const postNewAccount = evt => {
        evt.preventDefault()
        if(user.username===""|| user.password===""||user.email===""){
            window.alert("Please fill out all the required fields")
        }else if (user.username !== user.confirmUsername){
            window.alert("The usernames entered do not match")
        }else {
            if(image.profPic===""){
                const newUser = {
                    username: user.username,
                    email: user.email,
                    aboutMe: "",
                    profPic: "https://vectorified.com/images/no-profile-picture-icon-14.png"
                }
                UserManager.postNewProfile(newUser).then(jsonUser=> {
                  console.log(jsonUser)
                    setCredentials(newUser)
                    setIsLoading(true)
                    props.setUser(jsonUser)
                    props.history.push('/')})
            } else {
                const newUser = {
                    username: user.username,
                    email: user.email,
                    aboutMe: "",
                    profPic: image.profPic
                }
                UserManager.postNewProfile(newUser).then(jsonUser=> {
                    setIsLoading(true)
                    setCredentials(newUser)
                    props.setUser(jsonUser)
                    props.history.push('/')

                })
            }
           
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
    return (
        <>
         <form className="login-form" >
      <fieldset className="sign-in-form">
        <h3>Create Account</h3>
        <div className="formgrid">
          <input onChange={handleFieldChange} type="username"
            id="username"
            placeholder="Username"
            required="" autoFocus="" />
          <label htmlFor="inputUsername">Username</label>
          <input onChange={handleFieldChange} type="email"
            id="email"
            placeholder="Email address"
            required="" autoFocus="" />
          <label htmlFor="inputEmail">Email address</label>
          <input onChange={handleFieldChange} type="confirmUsername"
            id="confirmUsername"
            placeholder="Confirm Username"
            required="" 
            type="text"/>
          <label htmlFor="inputconfirmUsername">Confirm Username</label>
          <input
          name="file"
          id="profPic"
          type="file"
          className="file-upload"
          data-cloudinary-field="image_id"
          onChange={handleFile}
          data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
        />
          <label htmlFor="inputprofPic">Profile Pic</label>
          {uploadedImage.src==="" ? ( <div className="crop-container"><img className="crop-image" src="https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png"alt="none-found" /></div>)
          : (
            <>
            <div className="crop-container">
        <Cropper
          image={uploadedImage.src}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          className="crop-image"
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: 'slider' }}
        />
      </div>
            </>
          )}
          
         
        </div>
        <picture className="center-pic">
              <img src={user.profPic} className="create-pic" />
          </picture>
          {/* <div className="newPhoto">
      {isLoading ? (
        <h3> Loading...</h3>
      ) : (
        image.profPic==="" ? (
          <img src="https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png" style={{width: '300px'}}alt="none-found" />
        ) :(
        <img src={image.profPic} style={{width: '300px'}}alt="upload-photos" />)
      )}
    </div> */}
        <div className="button-container">
        <button type="submit" className="ui inverted primary button" onClick={postNewAccount}>Sign up!</button>
        </div>
      </fieldset>
    </form>
        </>
    )
}
export default CreateCardForm;