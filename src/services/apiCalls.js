import axios from "axios";

const HOST_URL = `http://localhost:4000/api`

// user
export const registerCall = async (body) => {
  return await axios.post(`http://localhost:4000/api/user/register`, body);
};

export const loginCall = async (body) => {
  return await axios.post(`http://localhost:4000/api/user/login`, body);
};

export const profileCall = async (token) => {
  return await axios.get(`http://localhost:4000/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// process.env.HOST_URL