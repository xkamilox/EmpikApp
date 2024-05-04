import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link ,useNavigate} from "react-router-dom";
import PATH from "../paths";

const parseJwt = (token) => {
  try{
    return JSON.parse(atob(token.split(".")[1]));
  }catch(e){
    return null;
  }
};

const AuthVerify = (props) => {   //przy każdej zmienie Route się odpala i sprawdza czy token wygasł jeśli tak to wylogowuje
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if(decodedJwt.exp*1000 <Date.now()){
        props.logOut();
        navigate(PATH.LOGIN);
        alert("Your Token has expired. Log in again.");
      }
    }
  }, [location, props])

  return ;
};

export default AuthVerify;

