import { createSlice } from "@reduxjs/toolkit";

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    loaded: false,
    contract: {},
    transaction: {
      isSuccessful: false,
    },
    events: [],
  },
  reducers: {
    EXCHANGE_LOADED: (state, action) => {
      const { exchange } = action.payload;
      return { ...state, loaded: true, contract: exchange };
    },
    EXCHANGE_TOKEN_1_BALANCE_LOADED: (state, action) => {
      const { balance } = action.payload;
      return { ...state, balances: [balance] };
    },
    EXCHANGE_TOKEN_2_BALANCE_LOADED: (state, action) => {
      const { balance } = action.payload;
      return { ...state, balances: [...state.balances, balance] };
    },
    TRANSFER_REQUEST: (state) => {
      return {
        ...state,
        trasnsaction: {
          transactionType: "Transfer",
          isPending: true,
          isSuccessful: false,
        },
        transferInProgress: true,
      };
    },
    TRANSFER_SUCCESS: (state, action) => {
      const { event } = action.payload;
      return {
        ...state,
        transaction: {
          transactionType: "Transfer",
          isPending: false,
          isSuccessful: true,
        },
        transferInProgress: false,
        events: [event, ...state.events],
      };
    },
    TRANSFER_FAIL: (state) => {
      return {
        ...state,
        transaction: {
          transactionType: "Transfer",
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
        transferInProgress: false,
      };
    },
  },
});

export const {
  EXCHANGE_LOADED,
  EXCHANGE_TOKEN_1_BALANCE_LOADED,
  EXCHANGE_TOKEN_2_BALANCE_LOADED,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
  TRANSFER_FAIL,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
