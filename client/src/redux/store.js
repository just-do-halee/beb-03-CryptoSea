import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createNFT from "./createNFT/nftSlice.js";
import accounts from "./account/accountSlice.js";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: {
    createNFT,
    accounts,
  },
  middleware: customizedMiddleware,
});
