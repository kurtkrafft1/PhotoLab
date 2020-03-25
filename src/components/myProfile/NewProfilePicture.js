import React, { useState, useEffect, useCallback } from "react" ;
import UserManager from "../../modules/UserManager";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider';
import getCroppedImg from "../createform/cropImage"

const NewProfilePicture = props => {
    const [currentPhoto, setCurrentPhoto] = useState({})
    const [image, setImage] = useState({profPic: ""})
    const [uploadedImage, setUploadedImage] = useState({src: ""})
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [hasCropped, setHasCropped] = useState(false)
    const [ stateCroppedAreaPixels, setCroppedAreaPixels] = useState({})
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
 
    setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const activeUser = JSON.parse(sessionStorage.getItem('credentials'))

    const croppingImage = async e => {
        e.preventDefault()
        try {

            const croppedImage = await getCroppedImg(
                uploadedImage.src,
                stateCroppedAreaPixels
              )

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
    const patchNewImage = e => {
        e.preventDefault()
        if(hasCropped===false){
            window.alert("Please crop your photo")
        } else {
        UserManager.patchNewImage(image.profPic, activeUser.id).then(user=> {
            props.setUser(user)
            props.history.push('/myprofile')
        })
    }

    }
    useEffect(()=> {
        UserManager.getUserInfo(activeUser.id).then(userFromApi=> {
            setCurrentPhoto({img: userFromApi[0].profPic})
        })
    },[])
    return (
        <>
        <h1>Change Profile Picture</h1>
        <form className="renew-photo-form">
            <fieldset className="sign-in-form">
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
          {image.profPic!== "" ? ( <div className="crop-container-new"><img className="crop-image" id="center-img" src={image.profPic}/></div>) : uploadedImage.src==="" ? ( <div className="crop-container-new"><div className="current-image-container" id="center-img"><img className="center-image" src={currentPhoto.img}alt="current one"/></div></div>)
          : (
            <>
            <div className="crop-container-new">
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
             <div className="button-container-create">
        <button type="submit" className="ui inverted primary button" onClick={croppingImage}>Crop</button>
        <button type="submit" className="ui inverted primary button" onClick={patchNewImage}>Save!</button>
        </div>
            </fieldset>
        </form>
        </>
    )
}
export default NewProfilePicture;