import { createSlice } from '@reduxjs/toolkit';

export const nftSlice = createSlice({
  name: 'createNFT',
  initialState: {
    name: '',
    description: '',
    image: '',
    attributes: [],
  },
  reducers: {
    incrementName: (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    },
    incrementImgFile: (state, action) => {
      state.image += action.payload;
      console.log(state.image);
    },
    incrementLink: (state, action) => {
      state.link = action.payload;
      console.log(state.link);
    },
    incrementDescription: (state, action) => {
      state.description = action.payload;
    },
    incrementAttributes: (state, action) => {
      state.attributes.push(action.payload);
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
