import { createSlice } from '@reduxjs/toolkit';

export const nftSlice = createSlice({
  name: 'createNFT',
  initialState: {
    name: '',
    description: '',
    image: [],
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
      // console.log(action);

      if (action.payload === 'plus') {
        state.attributes = [...state.attributes, { name: '', value: '' }];
      }
      const { name, value, index } = action.payload;
      if (name !== undefined) {
        state.attributes[index].name = name;
      }
      if (value !== undefined) {
        state.attributes[index].value = value;
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
