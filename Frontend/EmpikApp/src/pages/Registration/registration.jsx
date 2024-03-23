import React from 'react';
import "../../styles/registration.css";
import { Link } from "react-router-dom";
import PATH from "../../paths";

function Registration() {
  return (
    <div className="body_registration"> 
      <div className="register_container">
        <h2>Registration</h2>
        <input type="text" placeholder="Email" className="input_field"/>
        <input type="password" placeholder="Password" className="input_field"/>
        <input type="password" placeholder="Confirm password" className="input_field"/>
        <div className="button_container">
          <div className='login_conatiner'>
            <text>Do you have an account?</text>
            <Link to={PATH.LOGIN}>
              <button className='button_register'>Log in</button>
            </Link>
          </div>
          <button className='button'>Register</button>
        </div>
      </div>
    </div>
  );
}
export default Registration;
