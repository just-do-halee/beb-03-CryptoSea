import { createSlice } from '@reduxjs/toolkit';

export const nftSlice = createSlice({
  name: 'createNFT',
  initialState: {
    name: '',
    description: '',
    image: '',
    attributes: [{ name: '', value: '' }],
  },
  reducers: {
    incrementName: (state, action) => {
      state.name = action.payload;
    },
    incrementImgFile: (state, action) => {
      state.image = action.payload;
    },
    incrementLink: (state, action) => {
      state.link = action.payload;
    },
    incrementDescription: (state, action) => {
      state.description = action.payload;
    },
    incrementAttributes: (state, action) => {
      if (state.attributes.length === 1) {
        state.attributes[0] = action.payload;
      } else {
        state.attributes = [...state.attributes, action.payload];
      }
    },
  },
});

export const {
  incrementName,
  incrementLink,
  incrementImgFile,
  incrementDescription,
  incrementAttributes,
} = nftSlice.actions;

export default nftSlice.reducer;
