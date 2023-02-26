import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/provider";
import tokenReducer from "./slices/token"

export default configureStore({
  reducer: {
    provider:providerReducer,
    token:tokenReducer
  },
});
