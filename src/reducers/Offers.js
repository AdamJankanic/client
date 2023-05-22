import { createSlice } from "@reduxjs/toolkit";

// const offers = [
//   {
//     id: 1,
//     creatorId: 1,
//     title: "Offer 1",
//     location: "Place 1",
//     description: "Description 1",
//     price: 100,
//     category: "",
//     state: "new",
//     delivery: true,
//     image: imageBase,
//   },
//   {
//     id: 2,
//     creatorId: 1,
//     title: "Offer 2",
//     location: "testovaci kanal",
//     description: "Description 2",
//     price: 200,
//     category: "",
//     state: "new",
//     delivery: false,
//     image: imageBase,
//   },
//   {
//     id: 3,
//     creatorId: 2,
//     title: "Offer 3",
//     location: "Place 3",
//     description: "Description 3",
//     price: 300,
//     category: "",
//     state: "new",
//     delivery: true,
//     image: imageBase,
//   },
//   {
//     id: 4,
//     creatorId: 2,
//     title: "Offer 4",
//     location: "Place 4",
//     description: "Description 4",
//     price: 400,
//     category: "",
//     state: "new",
//     delivery: true,
//     image: imageBase,
//   },
//   {
//     id: 5,
//     creatorId: 2,
//     title: "Offer 5",
//     location: "Place 5",
//     description: "Description 5",
//     price: 500,
//     category: "",
//     state: "new",
//     delivery: false,
//     image: imageBase,
//   },
//   {
//     id: 6,
//     creatorId: 3,
//     title: "Offer 6",
//     location: "Place 6",
//     description: "Description 6",
//     price: 600,
//     category: "",
//     state: "new",
//     delivery: true,
//     image: imageBase,
//   },
//   {
//     id: 7,
//     creatorId: 3,
//     title: "Offer 7",
//     location: "Place 7",
//     description: "Description 7",
//     price: 700,
//     category: "",
//     state: "new",
//     delivery: false,
//     image: imageBase,
//   },
//   {
//     id: 8,
//     creatorId: 3,
//     title: "Offer 8",
//     location: "Place 8",
//     description: "Description 8",
//     price: 800,
//     category: "",
//     state: "new",
//     delivery: true,
//     image: imageBase,
//   },
//   {
//     id: 9,
//     creatorId: 3,
//     title: "Offer 9",
//     location: "Place 9",
//     description: "Description 9",
//     price: 900,
//     category: "kitchen",
//     state: "new",
//     delivery: false,
//     image: imageBase,
//   },
// ];

const offersSlice = createSlice({
  name: "allOffers",
  initialState: {
    allOffers: [],
    myOffers: [],
    contactedOffers: [],
    offerDetailId: null,
    offerDetailModal: false,
  },
  reducers: {
    addOffer: (state, action) => {
      state.allOffers.push(action.payload);
    },
    myOffers: (state, action) => {
      state.myOffers.push(action.payload);
    },

    deleteOffer: (state, action) => {
      state.allOffers = state.allOffers.filter(
        (offer) => offer.id !== action.payload
      );
    },

    contactOffers: (state, action) => {
      state.contactedOffers.push(action.payload);
    },

    clearOffers: (state) => {
      state.allOffers = [];
      state.myOffers = [];
      state.contactedOffers = [];
    },

    setOfferDetailId: (state, action) => {
      state.offerDetailId = action.payload;
    },

    setOfferDetailModal: (state, action) => {
      state.offerDetailModal = !state.offerDetailModal;
    },
  },
});

export const {
  addOffer,
  deleteOffer,
  setOfferDetailId,
  setOfferDetailModal,
  clearOffers,
  myOffers,
  contactOffers,
} = offersSlice.actions;
export default offersSlice.reducer;
