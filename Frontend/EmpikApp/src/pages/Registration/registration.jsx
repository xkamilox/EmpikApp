import React,{useState} from 'react';
import "../../styles/registration.css";
import { Link ,useNavigate} from "react-router-dom";
import PATH from "../../paths";
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        email,
        username,
        password,
        role: ['user']
      });

      navigate(PATH.LOGIN);
    } catch (error) {
      setError(error?.request?.response);
      console.error("Error during registration", error);
      console.log(error)
    }
  };

  return (
    <div className="body_registration">
      <div className="register_container">
        <h2>Registration</h2>
        <input
            type="text"
            placeholder="Username"
            className="input_field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
        
        <div className="button_container">
          <div className='login_conatiner'>
            <text>Do you have an account?</text>
            <Link to={PATH.LOGIN}>
              <button className='button_register'>Log in</button>
            </Link>
          </div>
          <button className='button' onClick={handleRegistration}>Register</button>
        </div>
      </div>
    </div>
  );
}
export default Registration;
