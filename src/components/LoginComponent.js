import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/authContext";

const LoginComponent = () => {
  const [formData, setFormData] = useState({email:'',password:''});
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const errors = {
    email: "Invalid email",
    pass: "Invalid password",
  };

  const getSum = (value) =>{
    return value.toString().split('').map(Number).reduce(function (a, b) { return a + b; }, 0);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;    

//eslint-disable-next-line
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formData.email)){
        isFormValid = false;
        console.log('Invalid email address')
        setErrorMessages(errorMessages => [...errorMessages , { name: "email", message: errors.email }]);
    } 
    if (getSum(formData.password) !== 10){
        isFormValid = false;
        setErrorMessages(errorMessages => [...errorMessages , { name: "pass", message: errors.pass }]);
    }    
    if (isFormValid) {
      login().then(() => {
        navigate("/home");
      });
    } 
  };

  
  const renderErrorMessage = (n) =>{
  let errorMessage = errorMessages.find(e => e?.name === n);
    if (errorMessage)
    return (<div className="error">{errorMessage.message}</div>);
  }

  function validate(theEvent) {
    let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  return (
    <div className="container">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="custom-input">
              <label>Email </label>
              <input type="text" name="email" required onChange={(event) => setFormData({...formData, email: event.target.value})} />
              {renderErrorMessage("email")}
              </div>
              <div className="custom-input">
              <label>Password </label>
              <input type="text" name="pass" 
              onKeyPress={validate}
              onChange={(e) => setFormData({...formData, password: e.target.value})}/>
              {renderErrorMessage("pass")}
              </div>
              <button className="submit_button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
