import "dotenv/config";
import axios from "axios";

// user
export const register = async (body) => {
  return await axios.post(`http://localhost:4000/api/user/register`, body);
};

export const login = async (body) => {
  return await axios.post(`http://localhost:4000/api/user/login`, body);
};

export const userProfile = async (token) => {
  return await axios.get(`http://localhost:4000/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// process.env.HOST_URL