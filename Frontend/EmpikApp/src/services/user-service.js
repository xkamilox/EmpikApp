import authHeader from './auth-header';
import axiosInstance from "../interceptors/axiosInstance.jsx";

const API_URL = 'users/';  //'http://localhost:8080/api/test/'


const getPublicContent = () => {
    return axiosInstance.get(API_URL + 'all');
  };

const getUserBoard = () => {
    return axiosInstance.get(API_URL + 'user', { headers: authHeader() });
  };

const getModeratorBoard = () => {
    return axiosInstance.get(API_URL + 'mod', { headers: authHeader() });
  };

const getAdminBoard = () => {
    return axiosInstance.get(API_URL + 'admin', { headers: authHeader() });
  };

const getUser = (userID) => {
  return axiosInstance
          .get(API_URL + userID)
          .then((response) => {
              return response.data;
          });

}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUser,
};
