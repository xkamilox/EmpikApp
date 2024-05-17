import axios from "axios";
import store from "../store.js";
import tokenService from "./tokenService.jsx";
import {logout} from "../actions/auth.js";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use(async (config) => {
        //const user = store.getState().user.user;
        const user = JSON.parse(localStorage.getItem("user"));
        config.headers['Authorization'] = `Bearer ${user ? user.accessToken : ''}`;

        if(user){
            const decodedJwt = tokenService.parseJwt(user.accessToken);
            const isExpired = decodedJwt.exp*1000 < Date.now();

            if(!isExpired) {  return config;}

            console.log("token wygas");

            await axios.post("http://localhost:8080/api/auth/refreshtoken", {refreshToken: tokenService.getStoreRefreshToken()} )
                .then((tokenRefreshResponse) => {
                        tokenService.setNewAccessToken(tokenRefreshResponse.data.accessToken);
                        config.headers['Authorization'] = `Bearer ${tokenRefreshResponse.data.accessToken}`;
                        },
                      async (error) => {
                         if(error.response.status === 403){
                             store.dispatch(logout());
                             window.location.href = "/";
                             alert("wylogowano");
                             await axios.post("http://localhost:8080/api/auth/signout");
                         }
                      }
                    );
        }

        return config;
    }, (error) => {
    return Promise.reject(error);
    }
);

instance.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
}
);


export default instance;
