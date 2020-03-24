import React, { useState, useCallback } from "react" ;
import UserManager from "../../modules/UserManager";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider';
import getCroppedImg from "./cropImage";
import "./create.css"

const CreateCardForm = (props) => {
    const [user, setUser] = useState({username:"", email: "", confirmUsername: "", profPic:"", id:"" })
    const [credentials, setCredentials] = useState({username:"", email: "", profPic:"", id:"" });
    const [image, setImage] = useState({profPic: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedImage, setUploadedImage] = useState({src: ""})
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [hasCropped, setHasCropped] = useState(false)
    const [ stateCroppedAreaPixels, setCroppedAreaPixels] = useState({})
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //   console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = {...user}
        stateToChange[evt.target.id] = evt.target.value
        setUser(stateToChange)
    }
    const croppingImage = async e => {
        e.preventDefault()
        try {
            const reader = new FileReader();
            const croppedImage = await getCroppedImg(
                uploadedImage.src,
                stateCroppedAreaPixels
              )

              console.log(croppedImage)
              setImage({profPic: croppedImage})
              setHasCropped(true)
          
            }   
            catch (e) {
                console.log(e)
            } 
    }
    const handleFile = e => {
        if(hasCropped===true){
            setImage({profPic: ""})
            setUploadedImage({src:""})
            setCrop({x:0, y:0})
            setHasCropped(false)
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                setUploadedImage({src: fileReader.result })
            }   
            fileReader.readAsDataURL(e.target.files[0])
        } else {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setUploadedImage({src: fileReader.result })
        }   
        fileReader.readAsDataURL(e.target.files[0])
    }
    }
    const postNewAccount =  evt => {
        evt.preventDefault()
         if(hasCropped===false){
             window.alert('Please crop your image')
         }
        else if(user.username===""|| user.password===""||user.email===""){
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
          {image.profPic!== "" ? ( <div className="crop-container"><img className="crop-image" src={image.src}/></div>) : uploadedImage.src==="" ? ( <div className="crop-container"><div className="no-image-container" id="center-img"><img className="center-image" src="https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png"alt="none-found"/></div></div>)
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
        <div className="button-container-create">
        <button type="submit" className="ui inverted primary button" onClick={croppingImage}>Crop</button>
        <button type="submit" className="ui inverted primary button" onClick={postNewAccount}>Sign up!</button>
        </div>
        {image.profPic === "" ? null : <div className="cropped-container"> <img src={image.profPic} alt="ral"  id="cropped-image"/></div>}
      </fieldset>
    
         

    </form>
        </>
    )
}
export default CreateCardForm;