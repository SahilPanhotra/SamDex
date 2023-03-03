import { createSlice } from "@reduxjs/toolkit";

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    loaded: false,
    contract: {},
    transaction: {
      isSuccessful: false,
    },
    allOrders: {
      loaded: false,
      data: [],
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
    // MAKING ORDERS CASES
    NEW_ORDER_REQUEST: (state) => {
      return {
        ...state,
        transaction: {
          transactionType: "New Order",
          isPending: true,
          isSuccessful: false,
        },
      };
    },
    NEW_ORDER_SUCCESS: (state, action) => {
      // Prevent duplicate orders
      let data, index;
      const { event, order } = action.payload;
      index = state.allOrders.data.findIndex(
        (orders) => orders.id === order.id
      );

      if (index === -1) {
        data = [...state.allOrders.data, order];
      } else {
        data = state.allOrders.data;
      }

      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          data,
        },
        transaction: {
          transactionType: "New Order",
          isPending: false,
          isSuccessful: true,
        },
        events: [event, ...state.events],
      };
    },
    NEW_ORDER_FAIL: (state) => {
      return {
        ...state,
        transaction: {
          transactionType: "New Order",
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
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
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
