import React,{useState} from 'react';
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PATH from "../../paths";
import "../../styles/login.css";

import { login } from "../../actions/auth";


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { isLoggedIn } = useSelector(state => state.user.isLoggedIn); //jak wejdzie przez url będąc zalogowanym to niech zostanie przeniesiony na inną stronę
    const { message } = useSelector(state => state.message); //wiadomość w responsie od serwera


    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if(!username.trim()){
            validationErrors.username = "username is required"
        }

        if(!password.trim()){
            validationErrors.password = "password is required"
        }

        setErrors(validationErrors);

        if(username && password) {
            dispatch(login(username, password))  //login wysyła POSTA z danymi
                .then(() => {
                    navigate(PATH.PRODUCT);
                    window.location.reload();
                });
        }
    };

    const goToGithub = ()  => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/github';
    };

    return (
        <div className="body_login">
            <div className="login_container">
                <h2>Login</h2>
                 <form onSubmit={handleLogin}>
                    <input
                     type="text"
                     placeholder="Username"
                     className="input_field"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                    />
                     {errors.username && <span>{errors.username}</span>}
                     <input
                         type="password"
                         placeholder="Password"
                         className="input_field"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                     />
                     {errors.password && <span>{errors.password}</span>}
                     <div className="button_container">
                         <div className='register_conatiner'>
                             <text>Don&apos;t have an account?</text>
                             <Link to={PATH.REGISTRATION}>
                                 <button className='button_register'>Create new</button>
                             </Link>
                         </div>
                         <button
                             className='button'
                             type="submit"
                         >Login
                         </button>
                     </div>
                     {message && <span>{message}</span>}
                 </form>
                <div className='text_container'>
                    <text className='text2'>Or Login With</text>
                </div>
                <div className='google_container'>
                        <button className='button_google' onClick={goToGithub}>
                            <img src="/src/images/Login/google.png" alt="Button Image"/>Sign in with Google
                        </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
