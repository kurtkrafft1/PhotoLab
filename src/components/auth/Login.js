import React, { useState } from "react";
import "./Login.css";
import UserManager from "../../modules/UserManager";
const Login = props => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };
  

  const validateLogin = e => {
    e.preventDefault();
    UserManager.checkProfile(credentials).then(userInfo=> {
    if(userInfo.length===0){
      window.alert("I am sorry, there wasn't an account that matched that email")
    } else if(credentials.password===userInfo[0].password){
      props.setUser(userInfo[0])
      props.history.push("/");
    } else{
      window.alert('Sorry, the password or email did not match')
    }
    })

  }

  return (
    <form className="login-form">
      <fieldset className="sign-in-form">
        <h3>Please sign in</h3>
        <div className="formgrid">
          <input onChange={handleFieldChange} type="email"
            id="email"
            placeholder="Email address"
            required="" autoFocus="" />
          <label htmlFor="inputEmail">Email address</label>

          <input onChange={handleFieldChange} type="password"
            id="password"
            placeholder="Password"
            required="" />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="button-container">
        <button type="submit" className="ui inverted primary button" onClick={validateLogin}>Sign in</button>
        </div>
      </fieldset>
    </form>
  );
};

export default Login;