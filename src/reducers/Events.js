import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "allEvents",
  initialState: {
    // allEvents: events,
    allEvents: [],
    joinedEvents: [],
    myEvents: [],
  },
  reducers: {
    addEvent: (state, action) => {
      state.allEvents.push(action.payload);
    },

    deleteEvent: (state, action) => {
      state.allOffers = state.allOffers.filter(
        (offer) => offer.id !== action.payload
      );
    },

    joinEvent: (state, action) => {
      state.joinedEvents.push(action.payload);
    },

    leaveEvent: (state, action) => {
      state.joinedEvents = state.joinedEvents.filter(
        (event) => event.id !== action.payload
      );
    },

    myEvents: (state, action) => {
      state.myEvents.push(action.payload);
    },

    clearStore: (state) => {
      state.allEvents = [];
      state.joinedEvents = [];
      state.myEvents = [];
    },
  },
});

export const { addEvent, deleteEvent, clearStore, myEvents, joinEvent } =
  eventsSlice.actions;
export default eventsSlice.reducer;
