import store from "../store.js";
import {refreshToken} from "../actions/auth.js";

const getStoreRefreshToken = () => {
    //const refreshToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;
    const refreshToken = JSON.parse(localStorage.getItem("auth"))?.refreshToken;
    console.log("refreshToken ze store: " + refreshToken);
    return refreshToken;
}

const setNewAccessToken = (accessToken) => {
    store.dispatch(refreshToken(accessToken));

    //const user = JSON.parse(localStorage.getItem("user"));
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log("stary accessToken: " + auth.accessToken);
    auth.accessToken = accessToken;
    console.log("nowy accessToken: " + auth.accessToken);
    localStorage.setItem("auth", JSON.stringify(auth));
}

const parseJwt = (token) => {
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }catch(e){
        return null;
    }
};

export default {
    getStoreRefreshToken,
    setNewAccessToken,
    parseJwt,
};
