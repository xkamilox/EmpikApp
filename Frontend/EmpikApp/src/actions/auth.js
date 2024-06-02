import AuthService from "../services/auth-service.js";


export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: "message/setMessage",
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const  message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: "message/setMessage",
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      console.log("dispatchowanie");
      dispatch({
        type: "user/setUser",
        payload: {user: data},
      });

      dispatch({
        type: "message/setMessage",
        payload: "zalogowano",
      });

      return data;
    },
    (error) => {
      console.log("niepowodzenie");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: "user/incrementLoginFail",
      });

      dispatch({
        type: "message/setMessage",
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const logout = () => (dispatch) => {
  localStorage.removeItem("auth");

  dispatch({
    type: "user/logout"
  });
};


export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: "user/refreshToken",
    payload: accessToken,
  })
};
