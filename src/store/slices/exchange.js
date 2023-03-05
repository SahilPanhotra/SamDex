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
    // CANCELLING ORDERS
    ORDER_CANCEL_REQUEST: (state) => {
      return {
        ...state,
        transaction: {
          transactionType: "Cancel",
          isPending: true,
          isSuccessful: false,
        },
      };
    },
    ORDER_CANCEL_SUCCESS: (state, action) => {
      const {order,event}=action.payload;
      return {
        ...state,
        transaction: {
          transactionType: "Cancel",
          isPending: false,
          isSuccessful: true,
        },
        cancelledOrders: {
          ...state.cancelledOrders,
          data: [...state.cancelledOrders.data, order],
        },
        events: [event, ...state.events],
      };
    },
    ORDER_CANCEL_FAIL: (state) => {
      return {
        ...state,
        transaction: {
          transactionType: "Cancel",
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
      };
    },
    CANCELLED_ORDERS_LOADED: (state, action) => {
      const { cancelledOrders } = action.payload;

      return {
        ...state,
        cancelledOrders: {
          loaded: true,
          data: cancelledOrders,
        },
      };
    },
    FILLED_ORDERS_LOADED: (state, action) => {
      const { filledOrders } = action.payload;

      return {
        ...state,
        filledOrders: {
          loaded: true,
          data: filledOrders,
        },
      };
    },
    ALL_ORDERS_LOADED: (state, action) => {
      const { allOrders } = action.payload;
      return {
        ...state,
        allOrders: {
          loaded: true,
          data: allOrders,
        },
      };
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
        (orders) => orders.id.toString() === order.id.toString()
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
  CANCELLED_ORDERS_LOADED,
  FILLED_ORDERS_LOADED,
  ALL_ORDERS_LOADED,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
