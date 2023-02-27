import { createSlice } from "@reduxjs/toolkit";

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    loaded: false,
    contract: {},
  },
  reducers: {
    EXCHANGE_LOADED: (state, action) => {
      const { exchange } = action.payload;
      return { ...state, loaded: true, contract: exchange };
    },
  },
});

export const { EXCHANGE_LOADED } = exchangeSlice.actions;

export default exchangeSlice.reducer;
