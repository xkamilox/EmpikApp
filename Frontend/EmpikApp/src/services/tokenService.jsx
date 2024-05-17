import store from "../store.js";
import {refreshToken} from "../actions/auth.js";

const getStoreRefreshToken = () => {
    const refreshToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;
    console.log("refreshToken ze store: " + refreshToken);
    return refreshToken;
}

const setNewAccessToken = (accessToken) => {
    store.dispatch(refreshToken(accessToken));

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("stary accessToken: " + user.accessToken);
    user.accessToken = accessToken;
    console.log("nowy accessToken: " + user.accessToken);
    localStorage.setItem("user", JSON.stringify(user));
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
