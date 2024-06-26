import React, {useContext, useState} from 'react';
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PATH from "../../paths";
import "../../styles/login.css";
import { GoogleLogin } from '@react-oauth/google';
import {UserContext} from "../../App.jsx";
import { login } from "../../actions/auth";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../interceptors/axiosInstance.jsx";



function Login() {
    const {userRoleContext, setUserRoleContext} = useContext(UserContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { isLoggedIn } = useSelector(state => state.user.isLoggedIn); //jak wejdzie przez url będąc zalogowanym to niech zostanie przeniesiony na inną stronę
    const { message } = useSelector(state => state.message); //wiadomość w responsie od serwera


    const dispatch = useDispatch();

    const handleLogin = async(e) => {
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
            await dispatch(login(username, password))  //login wysyła POSTA z danymi
                .then((user) => {
                    setUserRoleContext(user.roles.includes("ROLE_ADMIN") ? "admin" : "user");
                    console.log(userRoleContext);
                    navigate(PATH.PRODUCT);
                });
        }
    };

    const handleGoogleLoginSuccess = async(response) => {
        const credential = response.credential;

        await axiosInstance.post("auth/signin/google", {},
            {params: {googleCredential: credential}})
            .then((response) => {
                if(response.data.accessToken){
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                        userid: response.data.id
                    }));
                    setUserRoleContext(response.data.roles.includes("ROLE_ADMIN") ? "admin" : "user");
                    dispatch({type: "user/loginGoogle"});
                }

                navigate(PATH.PRODUCT);
            });

      };
    
      const handleGoogleLoginError = () => {
        console.log('Login nieudany');
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
                     {errors.username && <span >{errors.username}</span>}
                     <input
                         type="password"
                         placeholder="Password"
                         className="input_field"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                     />
                     {errors.password && <span>{errors.password}</span>}
                     {message && <span>{message}</span>}
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
                 </form>
                <div className='text_container'>
                    <span className='text2'>Or Login With</span>
                </div>
                <div className='google_div'>
                   
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                        />
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
