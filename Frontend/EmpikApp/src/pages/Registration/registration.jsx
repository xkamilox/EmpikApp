import React,{useState} from 'react';
import "../../styles/registration.css";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PATH from "../../paths";
import { isEmail } from "validator";

import {register} from "../../actions/auth.js"

function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector(state => state.user.isLoggedIn); //jak wejdzie przez url będąc zalogowanym to niech zostanie przeniesiony na inną stronę
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setSuccessful(false);
    const validationErrors = {};

    if(username.trim().length<3 || username.trim().length>20){
          validationErrors.username = "username should contain between 3 and 20 characters"
    }

      if(!email || email.length>50){
          validationErrors.email = "email should contain more than 0 and less than 50 characters"
      }else if( !isEmail(email) ){
          validationErrors.email = "invalid email format"
      }

    if(!password.trim()){
          validationErrors.password = "password is required"
    }else if( password.length<8 || password.length>40){
          validationErrors.password = "password should contain between 8 and 120 characters"
    }

    if(!repPassword.trim()){
          validationErrors.repPassword = "repeat password"
    }else if(repPassword!==password){
          validationErrors.repPassword = "passwords are not the same"
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
        dispatch(register(username, email, password))
            .then(() =>{
                setSuccessful(true);
            })
             .catch(() => {
                 setSuccessful(false)
             });
    }

  };

  return (
    <div className="body_registration">
      <div className="register_container">
        <h2>Registration</h2>
          <form onSubmit={handleRegistration}>
              <input
                  type="text"
                  placeholder="Username"
                  className="input_field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
              <input
                  type="email"
                  placeholder="Email"
                  className="input_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span >{errors.email}</span>}
              <input
                  type="password"
                  placeholder="Password"
                  className="input_field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <input
                  type="password"
                  placeholder="Repeat password"
                  className="input_field"
                  value={repPassword}
                  onChange={(e) => setRepPassword(e.target.value)}
              />
              {errors.repPassword && <span className="error-message">{errors.repPassword}</span>}

              <div className="button_container">
                  <div className='login_conatiner'>
                      <text>Do you have an account?</text>
                      <Link to={PATH.LOGIN}>
                          <button className='button_register'>Log in</button>
                      </Link>
                  </div>
                  <button className='button' type="submit">Register</button>
              </div>
              {message && <span>{message}</span>}
          </form>
      </div>
    </div>
  );
}

export default Registration;
