import { createSlice } from "@reduxjs/toolkit";

const bandMessagesSlice = createSlice({
  name: "bandMessages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      return action.payload;
    },
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = bandMessagesSlice.actions;
export default bandMessagesSlice.reducer;