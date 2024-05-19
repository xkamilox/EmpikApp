import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import tokenService from "../services/tokenService.jsx";
import store from "../store.js";
import {logout} from "../actions/auth.js";


const AuthVerify = (props) => {   //przy każdej zmienie Route się odpala i sprawdza czy token wygasł jeśli tak to wylogowuje
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkRefreshTokenExpiration = async () => {
      if(tokenService.getStoreRefreshToken()) { //user zalogowany
        await axios.post("http://localhost:8080/api/auth/refreshtoken", {refreshToken: tokenService.getStoreRefreshToken()})
          .then((res) => {
              //return res;
            },
            (error) => {
              if (error.response.status === 403) {
                store.dispatch(logout());
                navigate("/");
              }
            });
      }
    }

    checkRefreshTokenExpiration();
  }, [location, props])

};

export default AuthVerify;

