import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./booking/bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
