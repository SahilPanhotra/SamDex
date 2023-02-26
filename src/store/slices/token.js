import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    loaded:false,
    contract:null
  },
  reducers: {
    TOKEN_LOADED:(state,action)=>{
        const {token,symbol}=action.payload;
        return {...state,loaded:true,contract:token,symbol}
    }
  },
});

export const { TOKEN_LOADED } = tokenSlice.actions;

export default tokenSlice.reducer;
