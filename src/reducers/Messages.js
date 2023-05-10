import { createSlice } from "@reduxjs/toolkit";

// const spravy = [
//   {
//     id: 1,
//     name: "John",
//     time: "16:30",
//     text: "Ahoj, ako sa mas. Co mas nove? Kedy by sme sa mohli stretnut? Kavicka, financie, pivecko :P ?",
//     received: true,
//     channel: 1,
//     fileName: "subor1",
//     fileType: "",
//     uploadTime: "",
//   },
//   {
//     id: 2,
//     name: "Milanko",
//     time: "16:45",
//     text: "Velmi dobre sa mam, krasne je vonku.",
//     received: false,
//     channel: 1,
//     fileName: "subor2",
//     fileType: "",
//     uploadTime: "",
//   },
//   {
//     id: 3,
//     name: "Petko",
//     time: "17:15",
//     text: "Ahoj, ako sa mas. Co mas nove? Kedy by sme sa mohli stretnut? Kavicka, financie, pivecko :P ?",
//     received: true,
//     channel: 2,
//     fileName: "subor3",
//     fileType: "",
//     uploadTime: "",
//   },
//   {
//     id: 4,
//     name: "John",
//     time: "17:30",
//     text: "Ahoj, ako sa mas. Co mas nove? Kedy by sme sa mohli stretnut? Kavicka, financie, pivecko :P ?",
//     received: true,
//     channel: 3,
//     fileName: "subor4",
//     fileType: "",
//     uploadTime: "",
//   },
//   {
//     id: 5,
//     name: "Milanko",
//     time: "18:00",
//     text: "Ahoj, ako sa mas. Co mas nove? Kedy by sme sa mohli stretnut? Kavicka, financie, pivecko :P ?",
//     received: false,
//     channel: 5,
//     fileName: "subor5",
//     fileType: "",
//     uploadTime: "",
//   },
// ];

const messagesSlice = createSlice({
  name: "allMessages",
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    removeMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, removeMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
