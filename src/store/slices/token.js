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
        contracts: [ token],
        symbols: [symbol],
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
  },
});

export const { TOKEN_1_LOADED, TOKEN_2_LOADED } = tokenSlice.actions;

export default tokenSlice.reducer;
