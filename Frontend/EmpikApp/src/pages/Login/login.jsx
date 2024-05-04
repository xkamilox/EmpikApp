import React from 'react';
import { Link } from "react-router-dom";
import PATH from "../../paths";
import "../../styles/login.css";

function Login() {
  return (
    <div className="body_login"> 
      <div className="login_container">
        <h2>Login</h2>
        <input type="text" placeholder="Email" className="input_field"/>
        <input type="password" placeholder="Password" className="input_field"/>
        <div className="button_container">
          <div className='register_conatiner'>
            <text>Don't have an account?</text>
            <Link to={PATH.REGISTRATION}>
              <button className='button_register'>Create new</button>
            </Link>
          </div>
          <button className='button_login'>Login</button>
        </div>
        <div className='text_container'>
          <text className='text2'>Or Login With</text>
        </div>
        <div className='google_container'>
          <button className='button_google'>
            <img src="/src/images/Login/google.png" alt="Button Image" />Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
