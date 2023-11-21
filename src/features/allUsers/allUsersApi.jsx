import axios from 'axios';
import { getToken } from '../../utils/constants';
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const fetchAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/user/getAllUsers`,
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
      //   console.log(error);
      reject({ error: error.response.data });
    }
  });
};