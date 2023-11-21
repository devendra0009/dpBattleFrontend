import axios from 'axios';
import { getToken } from '../../utils/constants';
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const fetchAllContest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/contest/getAllContests`,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
      );
      const data = response.data;
      //   console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      //   console.log(error);
      reject({ error: error.response.data });
    }
  });
};
export const createContest = (contestData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contest/createContest`,
        contestData,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
      );
      const data = response.data;
      console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      console.log(error);
      reject({ error: error.response.data });
    }
  });
};
export const joinContest = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/contest/joinContest/${formData.contestId}`,
        formData.data,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
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
export const updateContest = (updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/contest/updateContest`,
        updatedData,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
      );
      const data = response.data;
      console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      console.log(error);
      reject({ error: error.response.data });
    }
  });
};
export const createContestWithFriend = (contestData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contest/createContestWithFriend`,
        contestData,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
      );
      const data = response.data;
      console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      console.log(error);
      reject({ error: error.response.data });
    }
  });
};
