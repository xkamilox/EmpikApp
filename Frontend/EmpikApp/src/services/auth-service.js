import axiosInstance from "../interceptors/axiosInstance.jsx";



 const login = (username, password) => {
    return axiosInstance
            .post("auth/signin", {username, password})
            .then((response) => {
              if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
              }

              return response.data;
            });

  }



 const register = (username, email, password) => {
    return axiosInstance.post("auth/signup", {username, email, password});
  }


export default {
  register,
  login
};
