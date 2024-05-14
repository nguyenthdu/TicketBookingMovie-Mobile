import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./booking/bookingSlice";
import isLoggedReducer from "./isloggedIn/isloggedSlice";
import loadingReducer from "./spin/spinSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    loading: loadingReducer,
    isLogged: isLoggedReducer,
  },
});
