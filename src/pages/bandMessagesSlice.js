import { createSlice } from "@reduxjs/toolkit";

const bandMessagesSlice = createSlice({
  name: "bandMessages",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      return action.payload; // assuming payload is an array of messages
    },
    addMessage: (state, action) => {
      state.push(action.payload); // assuming payload is a single message
    },
  },
});

export const { setMessages, addMessage } = bandMessagesSlice.actions;
export default bandMessagesSlice.reducer;