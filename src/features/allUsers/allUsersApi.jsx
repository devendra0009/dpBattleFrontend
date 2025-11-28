import axios from "axios";
import { getToken } from "../../utils/constants";
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const fetchAllUsers = (params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.q) queryParams.append("q", params.q);
      if (params.minFollowers)
        queryParams.append("minFollowers", params.minFollowers);
      if (params.maxFollowers)
        queryParams.append("maxFollowers", params.maxFollowers);
      if (params.minFollowing)
        queryParams.append("minFollowing", params.minFollowing);
      if (params.maxFollowing)
        queryParams.append("maxFollowing", params.maxFollowing);
      if (params.sortFollowers)
        queryParams.append("sortFollowers", params.sortFollowers);

      const queryString = queryParams.toString();
      const url = `${BASE_URL}/api/user/getAllUsers${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          "auth-token": getToken(),
        },
      });
      const data = response.data;
      console.log(response);
      // only return relevant information
      resolve({ data: data });
    } catch (error) {
      //   console.log(error);
      reject({ error: error.response.data });
    }
  });
};
