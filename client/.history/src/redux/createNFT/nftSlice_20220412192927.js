import { createSlice } from '@reduxjs/toolkit';

export const nftSlice = createSlice({
  name: 'createNFT',
  initialState: {
    name: '',
    description: '',
    image: {},
    attributes: [{ name: '', value: '' }],
  },
  reducers: {
    incrementName: (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    },
    incrementImgFile: (state, action) => {
      // console.log(action.payload);
      state.image = { ...state.image, ...action.payload };
      console.log(state.image);
    },
    incrementLink: (state, action) => {
      state.link = action.payload;
      console.log(state.link);
    },
    incrementDescription: (state, action) => {
      state.description = action.payload;
      console.log(state.description);
    },
    incrementAttributes: (state, action) => {
      console.log(action.payload);
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
