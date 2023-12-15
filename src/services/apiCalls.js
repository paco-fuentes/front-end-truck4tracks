import axios from "axios";

const HOST_URL = `http://localhost:4000/api`;

// user API calls
export const registerCall = async (body) => {
  return await axios.post(`${HOST_URL}/user/register`, body);
};

export const loginCall = async (body) => {
  return await axios.post(`${HOST_URL}/user/login`, body);
};

export const profileCall = async (token) => {
  return await axios.get(`${HOST_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
