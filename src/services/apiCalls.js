import "dotenv/config";
import axios from "axios";

// user
export const register = async (body) => {
  return await axios.post(process.env.HOST_URL`/user/register`, body);
};

export const login = async (body) => {
  return await axios.post(process.env.HOST_URL`/user/login`, body);
};

export const userProfile = async (token) => {
  return await axios.get(process.env.HOST_URL`/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
