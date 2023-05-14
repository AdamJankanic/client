import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "allChannels",
  initialState: {
    channels: [],
    active: 1,
    activeWebsockets: [],
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    activeChannel: (state, action) => {
      state.active = action.payload;
    },

    clearStore: (state) => {
      state.channels = [];
    },

    addWebsocket: (state, action) => {
      if (!state.activeWebsockets.includes(action.payload)) {
        state.activeWebsockets.push(action.payload);
      }
    },
  },
});

export const { addChannel, activeChannel, clearStore, addWebsocket } =
  channelsSlice.actions;
export default channelsSlice.reducer;
