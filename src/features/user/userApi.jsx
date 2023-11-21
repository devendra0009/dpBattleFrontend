import axios from 'axios';
import { getToken } from '../../utils/constants';
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

// *******ADD HEADERS IN EVERY REQ

export function fetchUserInfo() {
  return new Promise(async (resolve) => {
    const res = await axios.get(`${BASE_URL}/api/user/getUserByUserId`, {
      headers: {
        'auth-token': getToken(),
      },
    });
    console.log(res);
    // const data = res.data;
    // console.log(data);
    resolve({ data: res.data });
  });
}

export function deleteUser() {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`${BASE_URL}/api/user/deleteUserByUserId`, {
      headers: {
        'auth-token': getToken(),
      },
    });
    console.log(response);
    resolve({ data: response.data });
  });
}

export function updateUser(updateData) {
  return new Promise(async (resolve) => {
    console.log(updateData);
    const response = await axios.patch(`${BASE_URL}/api/user/${updateData._id}`, updateData, {
      headers: {
        'auth-token': getToken(),
      },
    });
    const data = response.data;
    console.log(data);
    resolve({ data });
  });
}
export function updateFollowerFollowing(updateData) {
  return new Promise(async (resolve) => {
    console.log(updateData);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/updateFollowerFollowingByUserId`,
        updateData,
        {
          headers: {
            'auth-token': getToken(),
          },
        }
      );
      const data = response.data;
      console.log(data);
      resolve({ data });
    } catch (error) {
      console.log("aee vala error",error);
    }
  });
}
