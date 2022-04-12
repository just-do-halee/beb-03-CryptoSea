import { configureStore } from '@reduxjs/toolkit';
import createNFT from './createNFT/nftSlice.js';
export default configureStore({
  reducer: {
    createNFT,
  },
});
