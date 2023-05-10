import { createSlice } from "@reduxjs/toolkit";

// const events = [
//   {
//     id: 1,
//     creatorId: 1,
//     title: "Event 1",
//     location: "Place 1",
//     date: "2021-01-01",
//     time: "12:00",
//     duration: 1,
//     price: 100,
//     joined: 4,
//     capacity: 10,
//     description: "Description 1",
//     category: "sports",
//   },
//   {
//     id: 2,
//     creatorId: 2,
//     title: "Event 2",
//     location: "Place 2",
//     date: "2021-01-01",
//     time: "12:00",
//     duration: 1,
//     price: 100,
//     joined: 2,
//     capacity: 10,
//     description: "Description 2",
//     category: "sports",
//   },
//   {
//     id: 3,
//     creatorId: 3,
//     title: "Event 3",
//     location: "Place 3",
//     date: "2021-01-01",
//     time: "12:00",
//     duration: 1,
//     price: 100,
//     joined: 8,
//     capacity: 10,
//     description: "Description 3",
//     category: "sports",
//   },
//   {
//     id: 4,
//     creatorId: 4,
//     title: "Event 4",
//     location: "Place 4",
//     date: "2021-01-01",
//     time: "12:00",
//     duration: 1,
//     price: 100,
//     joined: 10,
//     capacity: 10,
//     description: "Description 4",
//     category: "sports",
//   },
// ];

const eventsSlice = createSlice({
  name: "allEvents",
  initialState: {
    // allEvents: events,
    allEvents: [],
    joinedEvents: [],
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

    clearStore: (state) => {
      state.allEvents = [];
      state.joinedEvents = [];
    },
  },
});

export const { addEvent, deleteEvent, clearStore } = eventsSlice.actions;
export default eventsSlice.reducer;
