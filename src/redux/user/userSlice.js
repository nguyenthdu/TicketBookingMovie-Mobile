import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doSetUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { doSetUser } = userSlice.actions;

export default userSlice.reducer;
