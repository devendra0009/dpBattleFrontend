import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const registerUser = (userData) => {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        userData
      );
      const data = response.data;
      console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      // console.log(error);
      reject({ error: error.response.data });
    }
  });
};

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userData);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
      console.log(response);
      const data = response.data;
      resolve({ data: data });
    } catch (error) {
      // console.log(error);
      reject({ error: error.response.data });
    }
  });
}
export function authenticateUser(token) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(token);
      const response = await axios.get(`${BASE_URL}/api/auth/check`, {
        headers: {
          'auth-token': token,
        },
      });
      console.log(response);
      const data = response.data.token;
      resolve({ data: data });
    } catch (error) {
      // console.log(error);
      reject({ error: error.response.data });
    }
  });
}

export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    // Remove token from local-storage
    try {
      //   const res = await axios.post(`/users/logout`);
      resolve({ msg: 'Logged Out Successfully!' });
    } catch (error) {
      reject(error);
    }
  });
}
