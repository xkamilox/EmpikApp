import axiosInstance from "../services/axiosInstance.jsx";

const API_URL = "auth/";


 const login = (username, password) => {
    return axiosInstance
            .post(API_URL + "signin", {username, password},
              { skipAuthRefresh: true })
            .then((response) => {
              if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
              }

              return response.data;
            });

  }

/* const logout = () => {
    localStorage.removeItem("user");
  }*/

 const register = (username, email, password) => {
    return axiosInstance.post(API_URL + "signup", {username, email, password});
  }


export default {
  register,
  login,
  //logout
};
