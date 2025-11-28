import axios from "axios";
import { getToken } from "../../utils/constants";
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const fetchAllContest = (params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.status) queryParams.append("status", params.status);
      if (params.type) queryParams.append("type", params.type);
      if (params.user) queryParams.append("user", params.user);
      if (params.q) queryParams.append("q", params.q);

      const queryString = queryParams.toString();
      const url = `${BASE_URL}/api/contest/getAllContests${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          "auth-token": getToken(),
        },
      });
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
            "auth-token": getToken(),
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
            "auth-token": getToken(),
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
            "auth-token": getToken(),
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
            "auth-token": getToken(),
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
