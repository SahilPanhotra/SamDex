import { createSlice } from "@reduxjs/toolkit";

export const providerSlice = createSlice({
  name: "provider",
  initialState: {},
  reducers: {
    PROVIDER_LOADED: (state, action) => {
      const { connection } = action.payload;
      return { ...state, connection: connection };
    },
    NETWORK_LOADED: (state, action) => {
      const { chainId } = action.payload;
      return { ...state, chainId: chainId };
    },
    ACCOUNT_LOADED: (state, action) => {
      const { account } = action.payload;
      return { ...state, account: account };
    },
    ETHER_BALANCE_LOADED: (state, action) => {
      const { balance } = action.payload;
      return { ...state, balance: balance };
    },
  },
});

export const {
  PROVIDER_LOADED,
  NETWORK_LOADED,
  ACCOUNT_LOADED,
  ETHER_BALANCE_LOADED,
} = providerSlice.actions;

export default providerSlice.reducer;
