import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';  //'http://localhost:8080/api/test/'


const getPublicContent = () => {
    return axios.get(API_URL + 'all');
  };

const getUserBoard = () => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  };

const getModeratorBoard = () => {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  };

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  };

const getUser = (userID) => {
  return axios
          .get(API_URL + userID, {headers: authHeader() })
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
