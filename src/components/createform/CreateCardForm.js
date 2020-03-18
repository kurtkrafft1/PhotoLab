import React, { useState, useEffect } from "react" ;
import UserManager from "../../modules/UserManager";
import keys from "../../keys/ApiKies";

const CreateCardForm = (props) => {
    const [user, setUser] = useState({username:"", email: "", password: "",confirmedPassword:"", profPic:"", id:"" })
    const [credentials, setCredentials] = useState({username:"", email: "", password: "", profPic:"", id:"" });
    const [image, setImage] = useState({profPic: ""})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = evt => {
        const stateToChange = {...user}
        stateToChange[evt.target.id] = evt.target.value
        setUser(stateToChange)
    }
    const postNewAccount = evt => {
        evt.preventDefault()
        if(user.username===""|| user.password===""||user.email===""){
            window.alert("Please fill out all the required fields")
        }else if (user.password !== user.confirmedPassword){
            window.alert("The Passwords entered do not match")
        }else {
            if(image.profPic===""){
                const newUser = {
                    username: user.username,
                    email: user.email,
                    password: user.password,
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
                    password: user.password,
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

          <input onChange={handleFieldChange} type="password"
            id="password"
            placeholder="Password"
            required=""
            type="password" />
          <label htmlFor="inputPassword">Password</label>
          <input onChange={handleFieldChange} type="confirmPassword"
            id="confirmedPassword"
            placeholder="Confirm Password"
            required="" 
            type="password"/>
          <label htmlFor="inputconfirmPassword">Confirm Password</label>
          <input
          name="file"
          id="profPic"
          type="file"
          className="file-upload"
          data-cloudinary-field="image_id"
          onChange={uploadImage}
          data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
        />
          <label htmlFor="inputprofPic">Profile Pic</label>
         
        </div>
        <picture className="center-pic">
              <img src={user.profPic} className="create-pic" />
          </picture>
          <div className="newPhoto">
      {isLoading ? (
        <h3> Loading...</h3>
      ) : (
        image.profPic==="" ? (
          <img src="https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png" style={{width: '300px'}}alt="none-found" />
        ) :(
        <img src={image.profPic} style={{width: '300px'}}alt="upload-photos" />)
      )}
    </div>
        <div className="button-container">
        <button type="submit" className="ui inverted primary button" onClick={postNewAccount}>Sign up!</button>
        </div>
      </fieldset>
    </form>
        </>
    )
}
export default CreateCardForm;