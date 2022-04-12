import { configureStore } from '@reduxjs/toolkit';
import createNFT from './createNFT/nftSlice.js';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: {
    createNFT,
  },
  middleware: customizedMiddleware,
});
