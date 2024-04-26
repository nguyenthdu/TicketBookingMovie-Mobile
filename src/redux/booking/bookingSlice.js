import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCinema: {},
  selectedMovie: {},
  selectedShowTime: {},
  selectedRoom: {},
  selectedSeats: [],
  selectedFoods: [],
  selectedPromotionBill: {},
  selectedPromotionSeat: {},
  selectedPromotionFood: {},
  selectedPaymentMethod: {},
  totalPrice: 0,
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
    doSetSelectedPromotionBill: (state, action) => {
      state.selectedPromotionBill = action.payload;
    },
    doSetSelectedPromotionSeat: (state, action) => {
      state.selectedPromotionSeat = action.payload;
    },
    doSetSelectedPromotionFood: (state, action) => {
      state.selectedPromotionFood = action.payload;
    },
    doSetSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    doSetTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    doResetBooking: (state) => {
      state.selectedRoom = {};
      state.selectedSeats = [];
      state.selectedFoods = [];
      state.selectedPromotionBill = {};
      state.selectedPromotionSeat = {};
      state.selectedPromotionFood = {};
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
  doSetSelectedPromotionBill,
  doSetSelectedPromotionSeat,
  doSetSelectedPromotionFood,
  doSetSelectedShowTime,
  doSetSelectedRoom,
  doResetBooking,
  doSetTotalPrice,
} = bookingSlice.actions;

export default bookingSlice.reducer;
