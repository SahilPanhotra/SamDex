import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    loaded: false,
    contracts: [],
    symbols: [],
  },
  reducers: {
    TOKEN_1_LOADED: (state, action) => {
      const { token, symbol } = action.payload;
      return {
        ...state,
        loaded: true,
        contracts: [token],
        symbols: [symbol],
      };
    },
    TOKEN_1_BALANCE_LOADED: (state, action) => {
      const { balance } = action.payload;
      return {
        ...state,
        balances: [balance],
      };
    },
    TOKEN_2_LOADED: (state, action) => {
      const { token, symbol } = action.payload;
      return {
        ...state,
        loaded: true,
        contracts: [...state.contracts, token],
        symbols: [...state.symbols, symbol],
      };
    },
    TOKEN_2_BALANCE_LOADED: (state, action) => {
      const { balance } = action.payload;
      return {
        ...state,
        balances: [...state.balances, balance],
      };
    },
  },
});

export const {
  TOKEN_1_LOADED,
  TOKEN_2_LOADED,
  TOKEN_1_BALANCE_LOADED,
  TOKEN_2_BALANCE_LOADED,
} = tokenSlice.actions;

export default tokenSlice.reducer;
