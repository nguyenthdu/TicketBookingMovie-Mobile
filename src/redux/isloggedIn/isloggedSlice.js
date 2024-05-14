import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
};

export const isLoggedSlice = createSlice({
  name: "isLogged",
  initialState,
  reducers: {
    doSetIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { doSetIsLogged } = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
