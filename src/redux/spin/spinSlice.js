import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const spinSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    doSetLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { doSetLoading } = spinSlice.actions;

export default spinSlice.reducer;
