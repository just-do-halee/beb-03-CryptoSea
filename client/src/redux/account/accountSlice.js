import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: "",
  },
  reducers: {
    logOut: (state) => {
      state.accounts = "";
      console.log(state.accounts);
    },
    logIn: (state, action) => {
      state.accounts = action.payload;
      console.log(state.accounts);
    },
  },
});

export const { logIn, logOut } = accountSlice.actions;

export default accountSlice.reducer;
