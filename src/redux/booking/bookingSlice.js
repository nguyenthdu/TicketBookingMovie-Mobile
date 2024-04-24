import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCinema: {},
  selectedMovie: {},
  selectedShowTime: {},
  selectedRoom: {},
  selectedSeats: [],
  selectedFoods: [],
  selectedPromotion: {},
  selectedPaymentMethod: {},
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    doSetSelectedCinema: (state, action) => {
      state.selectedCinema = action.payload;
    },
    doSetSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    doSetSelectedShowTime: (state, action) => {
      state.selectedShowTime = action.payload;
    },
    doSetSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    doSetSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    doSetSelectedFoods: (state, action) => {
      state.selectedFoods = action.payload;
    },
    doSetSelectedPromotion: (state, action) => {
      state.selectedPromotion = action.payload;
    },
    doSetSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    doResetBooking: (state) => {
      state.selectedCinema = {};
      state.selectedMovie = {};
      state.selectedShowTime = {};
      state.selectedRoom = {};
      state.selectedSeats = [];
      state.selectedFoods = [];
      state.selectedPromotion = {};
      state.selectedPaymentMethod = {};
      //   localStorage.removeItem("bookingState");
    },
  },

  extraReducers: (builder) => {},
});

export const {
  doSetSelectedSeats,
  doSetSelectedCinema,
  doSetSelectedFoods,
  doSetSelectedMovie,
  doSetSelectedPaymentMethod,
  doSetSelectedPromotion,
  doSetSelectedShowTime,
  doSetSelectedRoom,
  doResetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
