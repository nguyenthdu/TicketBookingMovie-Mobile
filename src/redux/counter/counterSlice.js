// redux/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isRunning: false,
    countdownTime: 420,
  },
  reducers: {
    doSetIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setCountdownTime: (state, action) => {
      state.countdownTime = action.payload;
    },
    decrementCountdownTime: (state) => {
      state.countdownTime -= 1;
    },
    resetCountdownTime: (state, action) => {
      state.countdownTime = action.payload;
    },
  },
});

export const {
  doSetIsRunning,
  setCountdownTime,
  decrementCountdownTime,
  resetCountdownTime,
} = counterSlice.actions;

export default counterSlice.reducer;
