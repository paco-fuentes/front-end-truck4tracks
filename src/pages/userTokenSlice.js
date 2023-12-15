import { createSlice } from "@reduxjs/toolkit";

export const userTokenSlice = createSlice({
  name: "user",
  initialState: {
    credentials: {},
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout } = userTokenSlice.actions;
export const userData = (state) => state.user;
export default userTokenSlice.reducer;
