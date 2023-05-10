import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "allChannels",
  initialState: {
    channels: [],
    active: 1,
  },
  reducers: {
    addChannel: (state, action) => {
      // console.log("addMessage");
      state.channels.push(action.payload);
      // console log messages after action
      // console.log(
      //   JSON.stringify(state.messages[state.messages.length - 1].text)
      // );
    },
    activeChannel: (state, action) => {
      state.active = action.payload;
    },

    clearStore: (state) => {
      state.channels = [];
    },
  },
});

export const { addChannel, activeChannel, clearStore } = channelsSlice.actions;
export default channelsSlice.reducer;
