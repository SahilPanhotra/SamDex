import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/provider";
import tokenReducer from "./slices/token";
import exchangeReducer from "./slices/exchange";

export default configureStore({
  reducer: {
    provider: providerReducer,
    token: tokenReducer,
    exchange: exchangeReducer,
  },
});
